import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import Board from '../boards/board.entity'
import Task from '../tasks/task.entity';

/**
 * Column entity for db
 */
@Entity('columns')
class Column_ {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, board => board.columns,{ onDelete: "CASCADE" })
  board: Board

  @OneToMany(() => Task, task => task.column)
  tasks: Task[];

  @BeforeInsert()
  createId () {
    this.id = v4();
  }
}

export default Column_;
