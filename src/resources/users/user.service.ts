import usersRepo from './user.memory.repository';
import User from './user.model';
import tasksService from '../tasks/task.service';
import  { UserPayloadType } from './user.types';

/**
 * Function for getting all users from in-memory db
 * 
 * @returns Array of users
 */
const getAll = (): User[] => usersRepo.getAll();

/**
 * Function for getting user by id from in-memory db
 * 
 * @param id - User's uuid 
 * @returns Found user or undefined
 */
const getById = (id: string): User | undefined => usersRepo.getById(id);

/**
 * Function for add new user in in-memory db and get it
 * 
 * @param payload - Data for new user
 * @returns Created user
 */
const addUser = (payload: UserPayloadType): User => usersRepo.add(payload);

/**
 * Function for update user by id in in-memory db and get it
 * 
 * @param id - User's uuid 
 * @param payload - Data for update user
 * @returns Updated user
 */
const updateUser = (id: string, payload: UserPayloadType): User | null => usersRepo.update(id, payload);

/**
 * Function for delete user by id from in-memeory db and get it
 * 
 * @param id - User's uuid 
 * @returns Deleted user
 */
const deleteUser = (id: string): User | null => {
  tasksService.deleteTasksFromUser(id);
  return usersRepo._delete(id);
}

export default { getAll, getById, addUser, updateUser, deleteUser };
