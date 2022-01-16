import { getConnection } from 'typeorm';
import User from './user.entity';
import  { UserPayloadType } from './user.types';

/**
 * Function for getting all users from db
 * 
 * @returns Array of users
 */
const getAll =  (): Promise<User[]> => getConnection().manager.find(User);

/**
 * Function for getting user by id
 * 
 * @param id - User's uuid 
 * @returns Found user or undefined
 */
const getById = (id: string): Promise<User | undefined> => getConnection().manager.findOne(User, id);

/**
 * Function for create and add new user in db
 * 
 * @param payload - Data for new user
 * @returns Created user
 */
const add = async (payload: UserPayloadType): Promise<User> => {
  const connection = getConnection();
  const user = await connection.manager.create(User, payload);
  await connection.manager.save(user);

  return user;
};

/**
 * Function for update user by id
 * 
 * @param id - User's uuid
 * @param payload - Data for update user
 * @returns Updated user or null
 */
const update = async (id: string, payload: UserPayloadType): Promise<User | null> => {
  const connection = getConnection();
  const user = await connection.manager.findOne(User, id);

  if (user) {
    user.name = payload.name;
    user.login = payload.login;
    user.password = payload.password;

    await connection.manager.save(user);

    return user;
  }

  return null;
};

/**
 * Function for delete user from db by id
 * 
 * @param id - User's uuid
 * @returns Deleted user or null
 */
const _delete = async (id: string): Promise<User | null> => {
  const connection = getConnection();
  const user = await connection.manager.findOne(User, id);

  if (user) {
    await connection.manager.remove(user);

    return user;
  }

  return null;
};

export default { getAll, getById, add, update, _delete };
