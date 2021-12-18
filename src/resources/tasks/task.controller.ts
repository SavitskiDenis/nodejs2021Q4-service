import { FastifyReply, FastifyRequest } from 'fastify';
import tasksService from './task.service';
import HTTP_CODES from '../../common/http_codes';
import { TaskPayloadType } from './task.types';

const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = HTTP_CODES;


type HandlerBoard = (
  request: FastifyRequest<{ Params: { boardId: string }, Body: TaskPayloadType }>,
  reply: FastifyReply
) => void;
type HandlerBoardAndTask = (
  request: FastifyRequest<{ Params: { boardId: string, taskId: string }, Body: TaskPayloadType }>,
  reply: FastifyReply
) => void;

const getAllTasks: HandlerBoard = (request, reply) => {
  reply.send(tasksService.getAll(request.params.boardId));
};

const getTaskById: HandlerBoardAndTask = (request, reply) => {
  const task = tasksService.getById(request.params.taskId, request.params.boardId);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

const addTask: HandlerBoard = (request, reply) => {
  const task = tasksService.addTask(request.params.boardId, request.body);

  reply.code(CODE_CREATED).send(task);
};

const updateTask: HandlerBoardAndTask = (request, reply) => {
  const task = tasksService.updateTask(request.params.taskId, request.params.boardId, request.body);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

const deleteTask: HandlerBoardAndTask = (request, reply) => {
  const task = tasksService.deleteTask(request.params.taskId, request.params.boardId);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.code(CODE_NO_CONTENT).send();
};

export default {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask
};