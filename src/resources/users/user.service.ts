import usersRepo from './user.memory.repository';
import User from './user.model';
import tasksService from '../tasks/task.service';
import  { UserPayloadType } from './user.types';


const getAll = (): User[] => usersRepo.getAll();

const getById = (id: string): User | undefined => usersRepo.getById(id);

const addUser = (payload: UserPayloadType): User => usersRepo.add(payload);

const updateUser = (id: string, payload: UserPayloadType): User | null => usersRepo.update(id, payload);

const deleteUser = (id: string): User | null => {
  tasksService.deleteTasksFromUser(id);
  return usersRepo._delete(id);
}

export default { getAll, getById, addUser, updateUser, deleteUser };
