import { genSalt, hash } from 'bcrypt';
import Config from '../../common/config';
import usersRepo from './user.repository';
import User from './user.entity';
import  { UserPayloadType } from './user.types';

/**
 * Function for getting all users from in-memory db
 * 
 * @returns Array of users
 */
const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Function for getting user by id from in-memory db
 * 
 * @param id - User's uuid 
 * @returns Found user or undefined
 */
const getById = (id: string): Promise<User | undefined> => usersRepo.getById(id);

/**
 * Function for getting users by login from db
 * 
 * @param login - User's login
 * @returns Found users or undefined
 */
const getByLogin = (login: string): Promise<User[] | undefined> => usersRepo.getByLogin(login);

/**
 * Function for add new user in in-memory db and get it
 * 
 * @param payload - Data for new user
 * @returns Created user
 */
const addUser = async (payload: UserPayloadType): Promise<User> => {
    const salt = await genSalt(Config.SALT_ROUNDS);
    const password = await hash(payload.password, salt);

    return usersRepo.add({ ...payload, salt, password });
};

/**
 * Function for update user by id in in-memory db and get it
 * 
 * @param id - User's uuid 
 * @param payload - Data for update user
 * @returns Updated user
 */
const updateUser = async (id: string, payload: UserPayloadType): Promise<User | null> => {
    const salt = await genSalt(Config.SALT_ROUNDS);
    const password = await hash(payload.password, salt);

    return usersRepo.update(id, { ...payload, salt, password });
};

/**
 * Function for delete user by id from in-memeory db and get it
 * 
 * @param id - User's uuid 
 * @returns Deleted user
 */
const deleteUser = (id: string): Promise<User | null> => usersRepo._delete(id);

export default { getAll, getById, getByLogin, addUser, updateUser, deleteUser };
