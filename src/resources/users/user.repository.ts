import User from './user.entity';
import  { UserPayloadType } from './user.types';

/**
 * Function for getting all users from db
 * 
 * @returns Array of users
 */
const getAll =  (): Promise<User[]> => User.find();

/**
 * Function for getting user by id
 * 
 * @param id - User's uuid 
 * @returns Found user or undefined
 */
const getById = (id: string): Promise<User | undefined> => User.findOne(id);

/**
 * Function for getting users by login
 * 
 * @param id - User's uuid 
 * @returns Founded users or undefined
 */
const getByLogin = (login: string): Promise<User[] | undefined> => User.find({ where: { login } });

/**
 * Function for create and add new user in db
 * 
 * @param payload - Data for new user
 * @returns Created user
 */
const add = async (payload: UserPayloadType): Promise<User> => {
  const user = await User.create(payload);
  await user.save();

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
  const user = await getById(id);

  if (user) {
    user.name = payload.name;
    user.login = payload.login;
    user.password = payload.password;

    await user.save();

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
  const user = await getById(id);

  if (user) {
    await user.remove();

    return user;
  }

  return null;
};

export default { getAll, getById, getByLogin, add, update, _delete };
