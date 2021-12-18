import Task from './task.model';
import { TaskPayloadType } from './task.types';

let tasks: Task[] = [];


const getAll = (boardId: string): Task[] | undefined => tasks.filter(el => el.boardId === boardId);

const getById = (id: string, boardId: string): Task | undefined => tasks.find(el => el.id === id && el.boardId === boardId);

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

const _delete = (id: string, boardId: string): Task | null => {
  const taskIndex = tasks.findIndex(el => el.id === id && el.boardId === boardId);

  if (taskIndex >= 0) {
    const task = tasks[taskIndex];

    tasks.splice(taskIndex, 1);

    return task;
  }

  return null;
};

const deleteByBoardId = (boardId: string): void => {
  tasks = tasks.filter(el => el.boardId !== boardId);
};

const deleteTasksFromUser = (userId: string): void => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === userId) {
      tasks[i].userId = null;
    }
  }
};

export default { getAll, getById, add, update, _delete, deleteByBoardId, deleteTasksFromUser };
