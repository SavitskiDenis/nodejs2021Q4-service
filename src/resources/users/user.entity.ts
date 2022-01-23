import { BeforeInsert, Column, Entity, PrimaryColumn, OneToMany, BaseEntity } from 'typeorm';
import { v4 } from 'uuid';
import Task from '../tasks/task.entity';

/**
 * User entity for db
 */
@Entity('users')
class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @BeforeInsert()
  createId () {
    this.id = v4();
  }
}

export default User;
