import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { v4 } from 'uuid';
import Task from '../tasks/tasks.entity';
import Board from '../boards/boards.entity';

/**
 * Column entity for db
 */
@Entity('columns')
class Column_ extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board: Board;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];

  @BeforeInsert()
  createId() {
    this.id = v4();
  }
}

export default Column_;
