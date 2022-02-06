import {
  Column,
  Entity,
  BeforeInsert,
  ManyToOne,
  PrimaryColumn,
  JoinColumn
} from 'typeorm';
import { v4 } from 'uuid';
import User from '../users/users.entity';
import Board from '../boards/boards.entity';
import Column_ from '../columns/columns.entity';

/**
 * Task entity for db
 */
@Entity('tasks')
class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @ManyToOne(() => Column_, (column) => column.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'columnId' })
  column: Column_ | null;

  @BeforeInsert()
  createId() {
    this.id = v4();
  }
}

export default Task;
