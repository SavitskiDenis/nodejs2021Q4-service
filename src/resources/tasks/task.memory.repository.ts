import Task from './task.model';
import { TaskPayloadType } from './task.types';

let tasks: Task[] = [];


/**
 * Function for getting all tasks by board id
 * 
 * @param boardId - Board's uuid
 * @returns Found array of tasks or undefined
 */
const getAll = (boardId: string): Task[] | undefined => tasks.filter(el => el.boardId === boardId);

/**
 * Function for getting task by id and board id
 * 
 * @param id - Task's uuid
 * @param boardId - Board's uuid
 * @returns Found task or undefined
 */
const getById = (id: string, boardId: string): Task | undefined => tasks.find(el => el.id === id && el.boardId === boardId);

/**
 * Function for create and add new task in array
 * 
 * @param boardId - Board's uuid 
 * @param payload - Data for new task
 * @returns Created task
 */
const add = (boardId: string, payload: TaskPayloadType): Task => {
  const task = new Task(
    payload.title,
    payload.order,
    payload.description,
    payload.userId,
    boardId,
    payload.columnId
  );
  tasks.push(task);

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
const update = (id: string, boardId: string, payload: TaskPayloadType): Task | null => {
  const task = getById(id, boardId);

  if (task) {
    task.title = payload.title;
    task.order = payload.order;
    task.description = payload.description;
    task.userId = payload.userId;
    task.columnId = payload.columnId;

    return task;
  }

  return null;
};

/**
 * Function for delete task from array by id and board id
 * 
 * @param id - Task's uuid
 * @param boardId - Board's uuid
 * @returns Deleted task or null
 */
const _delete = (id: string, boardId: string): Task | null => {
  const taskIndex = tasks.findIndex(el => el.id === id && el.boardId === boardId);

  if (taskIndex >= 0) {
    const task = tasks[taskIndex];

    tasks.splice(taskIndex, 1);

    return task;
  }

  return null;
};

/**
 * Function for delete tasks from array by board id
 * 
 * @param boardId - Board's uuid
 */
const deleteByBoardId = (boardId: string): void => {
  tasks = tasks.filter(el => el.boardId !== boardId);
};

/**
 * Function for unlink tasks from the user
 * 
 * @param boardId - User's uuid
 */
const deleteTasksFromUser = (userId: string): void => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === userId) {
      tasks[i].userId = null;
    }
  }
};

export default { getAll, getById, add, update, _delete, deleteByBoardId, deleteTasksFromUser };
