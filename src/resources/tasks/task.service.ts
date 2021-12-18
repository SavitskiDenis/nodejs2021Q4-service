import tasksRepo from './task.memory.repository';
import Task from './task.model';
import { TaskPayloadType } from './task.types';


const getAll = (boardId: string): Task[] | undefined => tasksRepo.getAll(boardId);

const getById = (id: string, boardId: string): Task | undefined => tasksRepo.getById(id, boardId);

const addTask = (boardId: string, payload: TaskPayloadType): Task => tasksRepo.add(boardId, payload);

const updateTask = (id: string, boardId: string, payload: TaskPayloadType): Task | null => tasksRepo.update(id, boardId, payload);

const deleteTask = (id: string, boardId: string): Task | null => tasksRepo._delete(id, boardId);

const deleteTasksByBoardId = (boardId: string): void => tasksRepo.deleteByBoardId(boardId);

const deleteTasksFromUser = (userId: string): void => tasksRepo.deleteTasksFromUser(userId);

export default { getAll, getById, addTask, updateTask, deleteTask, deleteTasksByBoardId, deleteTasksFromUser };
