const Task = require('./task.model');

let tasks = [];

const getAll = (boardId) => tasks.filter(el => el.boardId === boardId);

const getById = (id, boardId) => tasks.find(el => el.id === id && el.boardId === boardId);

const add = (boardId, payload) => {
  const task = new Task({ ...payload, boardId });
  tasks.push(task);

  return task;
};

const update = (id, boardId, payload) => {
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

const _delete = (id, boardId) => {
  const taskIndex = tasks.findIndex(el => el.id === id && el.boardId === boardId);

  if (taskIndex >= 0) {
    const task = tasks[taskIndex];

    tasks.splice(taskIndex, 1);

    return task;
  }

  return null;
};

const deleteByBoardId = (boardId) => {
  tasks = tasks.filter(el => el.boardId !== boardId);
};

const deleteTasksFromUser = (userId) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === userId) {
      tasks[i].userId = null;
    }
  }
};

module.exports = { getAll, getById, add, update, _delete, deleteByBoardId, deleteTasksFromUser };
