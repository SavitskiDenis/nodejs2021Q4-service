import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { UserResponse } from './users.types';
import User from './users.entity';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
  private mapEntityToResponse = (entity: User): UserResponse => ({
    id: entity.id,
    login: entity.login,
    name: entity.name,
  });

  /**
   * Function for getting all users from db
   *
   * @returns Array of users
   */
  getAll = async (): Promise<UserResponse[]> => {
    const users = await User.find();

    return users.map((el) => this.mapEntityToResponse(el));
  };

  /**
   * Function for getting user by id from db
   *
   * @param id - User's uuid
   * @returns Found user or undefined
   */
  getById = async (id: string): Promise<UserResponse | undefined> => {
    const user = await User.findOne(id);

    return user ? this.mapEntityToResponse(user) : undefined;
  };

  /**
   * Function for getting users by login from db
   *
   * @param login - User's login
   * @returns Found users or undefined
   */
  getByLogin = (login: string): Promise<User[] | undefined> =>
    User.find({ where: { login } });

  /**
   * Function for add new user in db and get it
   *
   * @param payload - Data for new user
   * @returns Created user
   */
  addUser = async (payload: UserDTO): Promise<UserResponse> => {
    const salt = await genSalt(5);
    const password = await hash(payload.password, salt);

    const user = await User.create({ ...payload, salt, password });
    await user.save();

    return this.mapEntityToResponse(user);
  };

  /**
   * Function for update user by id in db and get it
   *
   * @param id - User's uuid
   * @param payload - Data for update user
   * @returns Updated user
   */
  updateUser = async (
    id: string,
    payload: UserDTO
  ): Promise<UserResponse | null> => {
    const user = await User.findOne(id);

    if (user) {
      const salt = await genSalt(5);
      const password = await hash(payload.password, salt);

      user.name = payload.name;
      user.login = payload.login;
      user.password = password;
      user.salt = salt;

      await user.save();

      return this.mapEntityToResponse(user);
    }

    return null;
  };

  /**
   * Function for delete user by id from db and get it
   *
   * @param id - User's uuid
   * @returns Deleted user
   */
  deleteUser = async (id: string): Promise<UserResponse | null> => {
    const user = await User.findOne(id);

    if (user) {
      await user.remove();

      return this.mapEntityToResponse(user);
    }

    return null;
  };
}
