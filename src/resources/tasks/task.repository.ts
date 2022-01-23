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
const getAll = (boardId: string): Promise<Task[] | undefined> => Task.find({ where: { board: { id: boardId } }, relations: ['board', 'column', 'user'] });

/**
 * Function for getting task by id and board id
 * 
 * @param id - Task's uuid
 * @param boardId - Board's uuid
 * @returns Found task or undefined
 */
const getById = (id: string, boardId: string): Promise<Task | undefined> => Task.findOne({ where: { id, board: { id: boardId } }, relations: ['board', 'column', 'user'] });

/**
 * Function for create and add new task in db
 * 
 * @param boardId - Board's uuid 
 * @param payload - Data for new task
 * @returns Created task
 */
const add = async (boardId: string, payload: TaskPayloadType): Promise<Task> => {
  const task = await Task.create({
    title: payload.title,
    order: payload.order,
    description: payload.description,
    board: { id: boardId },
    user: typeof payload.userId === 'string' ? { id: payload.userId } : null,
    column: typeof payload.columnId === 'string' ? { id: payload.columnId } : null
  });
  await task.save();

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
    let column = null;
    if (typeof payload.columnId === 'string') {
      column = await Column_.findOneOrFail(payload.columnId);
    }

    let user = null;
    if (typeof payload.userId === 'string') {
      user = await User.findOneOrFail(payload.userId);
    }

    task.title = payload.title;
    task.order = payload.order;
    task.description = payload.description;
    task.user = user;
    task.column = column;

    await task.save();

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
    await task.remove();

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
    await Promise.all(tasks.map(el => el.remove()));
  }
};

export default { getAll, getById, add, update, _delete, deleteByBoardId };
