const tasksService = require('./task.service');
const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = require('../../common/http_codes');

const getAllTasks = (request, reply) => {
  reply.send(tasksService.getAll(request.params.boardId));
};

const getTaskById = (request, reply) => {
  const task = tasksService.getById(request.params.taskId, request.params.boardId);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

const addTask = (request, reply) => {
  const task = tasksService.addTask(request.params.boardId, request.body);

  reply.code(CODE_CREATED).send(task);
};

const updateTask = (request, reply) => {
  const task = tasksService.updateTask(request.params.taskId, request.params.boardId, request.body);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

const deleteTask = (request, reply) => {
  const task = tasksService.deleteTask(request.params.taskId, request.params.boardId);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.code(CODE_NO_CONTENT).send();
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
};