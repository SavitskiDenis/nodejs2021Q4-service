import { FastifyReply, FastifyRequest } from 'fastify';
import tasksService from './task.service';
import HTTP_CODES from '../../common/http_codes';
import { TaskPayloadType } from './task.types';

const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = HTTP_CODES;

/**
 * Fastify handler type for tasks with boardId param
 */
type HandlerBoard = (
  request: FastifyRequest<{ Params: { boardId: string }, Body: TaskPayloadType }>,
  reply: FastifyReply
) => void;

/**
 * Fastify handler type for tasks with boardId and taskId params
 */
type HandlerBoardAndTask = (
  request: FastifyRequest<{ Params: { boardId: string, taskId: string }, Body: TaskPayloadType }>,
  reply: FastifyReply
) => void;

/**
 * Handler function for GET /boards/:boardId/tasks request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const getAllTasks: HandlerBoard = (request, reply) => {
  reply.send(tasksService.getAll(request.params.boardId));
};

/**
 * Handler function for GET /boards/:boardId/tasks/:taskId request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const getTaskById: HandlerBoardAndTask = (request, reply) => {
  const task = tasksService.getById(request.params.taskId, request.params.boardId);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

/**
 * Handler function for POST /boards/:boardId/tasks request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const addTask: HandlerBoard = (request, reply) => {
  const task = tasksService.addTask(request.params.boardId, request.body);

  reply.code(CODE_CREATED).send(task);
};

/**
 * Handler function for PUT /boards/:boardId/tasks/:taskId request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const updateTask: HandlerBoardAndTask = (request, reply) => {
  const task = tasksService.updateTask(request.params.taskId, request.params.boardId, request.body);
  if (!task) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
    return;
  }

  reply.send(task);
};

/**
 * Handler function for DELETE /boards/:boardId/tasks/:taskId request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
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