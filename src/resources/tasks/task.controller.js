const tasksService = require('./task.service');

const getAllTasks = (request, reply) => {
  reply.send(tasksService.getAll(request.params.boardId));
};

const getTaskById = (request, reply) => {
  const task = tasksService.getById(request.params.taskId, request.params.boardId);
  if (!task) {
    reply.code(404);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

const addTask = (request, reply) => {
  const task = tasksService.addTask(request.params.boardId, request.body);

  reply.code(201).send(task);
};

const updateTask = (request, reply) => {
  const task = tasksService.updateTask(request.params.taskId, request.params.boardId, request.body);
  if (!task) {
    reply.code(404);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

const deleteTask = (request, reply) => {
  const task = tasksService.deleteTask(request.params.taskId, request.params.boardId);
  if (!task) {
    reply.code(404);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.code(204).send();
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
};