import { BeforeInsert, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 } from 'uuid';
import Task from '../tasks/task.entity';

/**
 * User entity for db
 */
@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @BeforeInsert()
  createId () {
    this.id = v4();
  }
}

export default User;
