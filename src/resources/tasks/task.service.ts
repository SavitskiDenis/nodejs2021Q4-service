import tasksRepo from './task.memory.repository';
import Task from './task.model';
import { TaskPayloadType } from './task.types';

/**
 * Function for getting all task by board id from in-memory db
 * 
 * @param boardId - Board's uuid
 * @returns Found array of tasks or undefined
 */
const getAll = (boardId: string): Task[] | undefined => tasksRepo.getAll(boardId);

/**
 * Function for getting task by id and board id from in-memory db
 * 
 * @param id - Task's uuid 
 * @param boardId - Board's uuid
 * @returns Found task or undefined
 */
const getById = (id: string, boardId: string): Task | undefined => tasksRepo.getById(id, boardId);

/**
 * Function for add new task in in-memory db and get it
 * 
 * @param boardId - Board's uuid
 * @param payload - Data for new task
 * @returns Cretaed task
 */
const addTask = (boardId: string, payload: TaskPayloadType): Task => tasksRepo.add(boardId, payload);

/**
 * Function for update task by id and board id in in-memory db and get it
 * 
 * @param id - Task's uuid 
 * @param boardId - Board's uuid
 * @param payload - Data for update task
 * @returns Updated task or null
 */
const updateTask = (id: string, boardId: string, payload: TaskPayloadType): Task | null => tasksRepo.update(id, boardId, payload);

/**
 * Function for delete task by id and board id from in-memeory db and get it
 * 
 * @param id - Task's uuid 
 * @param boardId - Board's uuid
 * @returns Deleted task or null
 */
const deleteTask = (id: string, boardId: string): Task | null => tasksRepo._delete(id, boardId);

/**
 * Function for delete tasks by board id from in-memeory db
 * 
 * @param boardId - Board's uuid
 */
const deleteTasksByBoardId = (boardId: string): void => tasksRepo.deleteByBoardId(boardId);

/**
 * Function for unlink tasks from the user in in-memory db
 * 
 * @param userId - User's uuid 
 */
const deleteTasksFromUser = (userId: string): void => tasksRepo.deleteTasksFromUser(userId);

export default { getAll, getById, addTask, updateTask, deleteTask, deleteTasksByBoardId, deleteTasksFromUser };
