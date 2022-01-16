import tasksRepo from './task.repository';
import Task from './task.model';
import TaskEntity from './task.entity';
import { TaskPayloadType } from './task.types';

/**
 * Function for map entity object to model
 * 
 * @param entity - Task entity
 * @returns Task model
 */
const mapEntityToModel = (entity: TaskEntity): Task => new Task(
  entity.id,
  entity.title,
  entity.order,
  entity.description,
  entity.user ? entity.user.id : null,
  entity.board.id,
  entity.column ? entity.column.id : null
);

/**
 * Function for getting all task by board id from db
 * 
 * @param boardId - Board's uuid
 * @returns Found array of tasks or undefined
 */
const getAll = async (boardId: string): Promise<Task[] | undefined> => {
  const result = await tasksRepo.getAll(boardId);

  return result?.map(el => mapEntityToModel(el));
};

/**
 * Function for getting task by id and board id from db
 * 
 * @param id - Task's uuid 
 * @param boardId - Board's uuid
 * @returns Found task or undefined
 */
const getById = async (id: string, boardId: string): Promise<Task | undefined> => {
  const result = await tasksRepo.getById(id, boardId);

  return result
    ? mapEntityToModel(result)
    : undefined;
}

/**
 * Function for add new task in db and get it
 * 
 * @param boardId - Board's uuid
 * @param payload - Data for new task
 * @returns Cretaed task
 */
const addTask = async (boardId: string, payload: TaskPayloadType): Promise<Task> => { 
  const result = await tasksRepo.add(boardId, payload);

  return mapEntityToModel(result);
};

/**
 * Function for update task by id and board id in db and get it
 * 
 * @param id - Task's uuid 
 * @param boardId - Board's uuid
 * @param payload - Data for update task
 * @returns Updated task or null
 */
const updateTask = async (id: string, boardId: string, payload: TaskPayloadType): Promise<Task | null> => {
  const result = await tasksRepo.update(id, boardId, payload);

  return result
    ? mapEntityToModel(result)
    : null;
};

/**
 * Function for delete task by id and board id from db and get it
 * 
 * @param id - Task's uuid 
 * @param boardId - Board's uuid
 * @returns Deleted task or null
 */
const deleteTask = async (id: string, boardId: string): Promise<Task | null> => {
  const result = await tasksRepo._delete(id, boardId);

  return result
    ? mapEntityToModel(result)
    : null;
};

export default { getAll, getById, addTask, updateTask, deleteTask };
