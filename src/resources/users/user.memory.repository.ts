import User from './user.model';
import  { UserPayloadType } from './user.types';

const users: User[] = [];

/**
 * Function for getting all users
 * 
 * @returns {User[]} Array of users
 */
const getAll = (): User[] => users;

/**
 * Function for getting user by id
 * 
 * @param {string} id User's uuid 
 * @returns {User|undefined} Found user or undefined
 */
const getById = (id: string): User | undefined => users.find((el: User): boolean => el.id === id);

/**
 * Function for create and add new user in array
 * 
 * @param {UserPayloadType} payload Data for new user
 * @returns {User} Created user
 */
const add = (payload: UserPayloadType): User => {
  const user = new User(payload.name, payload.login, payload.password);
  users.push(user);

  return user;
};

/**
 * Function for update user by id
 * 
 * @param {string} id User's uuid
 * @param {UserPayloadType} payload Data for update user
 * @returns {User|null} Updated user or null
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
 * @param {string} id User's uuid
 * @returns {User|null} Deleted user or null
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
