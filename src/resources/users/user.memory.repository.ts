import User from './user.model';
import  { UserPayloadType } from './user.types';

const users: User[] = [];

/**
 * Function for getting all users
 * 
 * @returns Array of users
 */
const getAll = (): User[] => users;

/**
 * Function for getting user by id
 * 
 * @param id - User's uuid 
 * @returns Found user or undefined
 */
const getById = (id: string): User | undefined => users.find((el: User): boolean => el.id === id);

/**
 * Function for create and add new user in array
 * 
 * @param payload - Data for new user
 * @returns Created user
 */
const add = (payload: UserPayloadType): User => {
  const user = new User(payload.name, payload.login, payload.password);
  users.push(user);

  return user;
};

/**
 * Function for update user by id
 * 
 * @param id - User's uuid
 * @param payload - Data for update user
 * @returns Updated user or null
 */
const update = (id: string, payload: UserPayloadType): User | null => {
  const user = users.find(el => el.id === id);

  if (user) {
    user.name = payload.name;
    user.login = payload.login;
    user.password = payload.password;

    return user;
  }

  return null;
};

/**
 * Function for delete user from array by id
 * 
 * @param id - User's uuid
 * @returns Deleted user or null
 */
const _delete = (id: string): User | null => {
  const userIndex = users.findIndex(el => el.id === id);

  if (userIndex >= 0) {
    const user = users[userIndex];

    users.splice(userIndex, 1);

    return user;
  }

  return null;
};

export default { getAll, getById, add, update, _delete };
