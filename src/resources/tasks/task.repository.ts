import { getConnection } from 'typeorm';
import Column_ from '../column/column.entity';
import User from '../users/user.entity';
import Task from './task.entity';
import { TaskPayloadType } from './task.types';

/**
 * Function for getting all tasks by board id
 * 
 * @param boardId - Board's uuid
 * @returns Found array of tasks or undefined
 */
const getAll = (boardId: string): Promise<Task[] | undefined> => getConnection().manager.find(Task, { where: { board: { id: boardId } }, relations: ['board', 'column', 'user'] });

/**
 * Function for getting task by id and board id
 * 
 * @param id - Task's uuid
 * @param boardId - Board's uuid
 * @returns Found task or undefined
 */
const getById = (id: string, boardId: string): Promise<Task | undefined> => getConnection().manager.findOne(Task, { where: { id, board: { id: boardId } }, relations: ['board', 'column', 'user'] });

/**
 * Function for create and add new task in db
 * 
 * @param boardId - Board's uuid 
 * @param payload - Data for new task
 * @returns Created task
 */
const add = async (boardId: string, payload: TaskPayloadType): Promise<Task> => {
  const connection = getConnection();
  const task = await connection.manager.create(Task, {
    title: payload.title,
    order: payload.order,
    description: payload.description,
    board: { id: boardId },
    user: typeof payload.userId === 'string' ? { id: payload.userId } : null,
    column: typeof payload.columnId === 'string' ? { id: payload.columnId } : null
  });
  await connection.manager.save(task);

  return task;
};

/**
 * Function for update task by id and board id
 * 
 * @param id - Task's uuid
 * @param boardId - Board's uuid
 * @param payload - Data for update task
 * @returns Updated task or null
 */
const update = async (id: string, boardId: string, payload: TaskPayloadType): Promise<Task | null> => {
  const task = await getById(id, boardId);

  if (task) {
    const connection = getConnection();

    let column = null;
    if (typeof payload.columnId === 'string') {
      column = await connection.manager.findOneOrFail(Column_, payload.columnId);
    }

    let user = null;
    if (typeof payload.userId === 'string') {
      user = await connection.manager.findOneOrFail(User, payload.userId);
    }

    task.title = payload.title;
    task.order = payload.order;
    task.description = payload.description;
    task.user = user;
    task.column = column;

    await connection.manager.save(task);

    return task;
  }

  return null;
};

/**
 * Function for delete task from db by id and board id
 * 
 * @param id - Task's uuid
 * @param boardId - Board's uuid
 * @returns Deleted task or null
 */
const _delete = async (id: string, boardId: string): Promise<Task | null> => {
  const task = await getById(id, boardId);

  if (task) {
    await getConnection().manager.remove(task);

    return task;
  }

  return null;
};

/**
 * Function for delete tasks from db by board id
 * 
 * @param boardId - Board's uuid
 */
const deleteByBoardId = async (boardId: string): Promise<void> => {
  const tasks = await getAll(boardId);
  if (Array.isArray(tasks)) {
    const connection = getConnection();
    await Promise.all(tasks.map(el => connection.manager.remove(el)));
  }
};

export default { getAll, getById, add, update, _delete, deleteByBoardId };
