import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import Task from '../tasks/tasks.entity';
import Column_ from '../columns/columns.entity';

/**
 * Board entity for db
 */
@Entity('boards')
class Board {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Column_, (column_) => column_.board)
  columns: Column_[];

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @BeforeInsert()
  createId() {
    this.id = v4();
  }
}

export default Board;
