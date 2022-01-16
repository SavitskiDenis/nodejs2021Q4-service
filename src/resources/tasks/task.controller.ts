import { FastifyReply, FastifyRequest } from 'fastify';
import tasksService from './task.service';
import HTTP_CODES from '../../common/http_codes';
import { TaskPayloadType } from './task.types';
import NotFoundError from '../../errors/NotFoundError';

const { CODE_CREATED, CODE_NO_CONTENT } = HTTP_CODES;

/**
 * Fastify handler type for tasks with boardId param
 */
type HandlerBoard = (
  request: FastifyRequest<{ Params: { boardId: string }, Body: TaskPayloadType }>,
  reply: FastifyReply
) => Promise<void>;

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
 * @param request - Instance of the standard http or http2 request objects
 * @param reply - Instance of the standard http or http2 reply types
 */
const getAllTasks: HandlerBoard = async (request, reply) => {
  const result = await tasksService.getAll(request.params.boardId);
  reply.send(result);
};

/**
 * Handler function for GET /boards/:boardId/tasks/:taskId request
 * 
 * @param request - Instance of the standard http or http2 request objects
 * @param reply - Instance of the standard http or http2 reply types
 */
const getTaskById: HandlerBoardAndTask = async (request, reply) => {
  const task = await tasksService.getById(request.params.taskId, request.params.boardId);
  if (!task) {
    throw new NotFoundError(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
  }

  reply.send(task);
};

/**
 * Handler function for POST /boards/:boardId/tasks request
 * 
 * @param request - Instance of the standard http or http2 request objects
 * @param reply - Instance of the standard http or http2 reply types
 */
const addTask: HandlerBoard = async (request, reply) => {
  const task = await tasksService.addTask(request.params.boardId, request.body);

  reply.code(CODE_CREATED).send(task);
};

/**
 * Handler function for PUT /boards/:boardId/tasks/:taskId request
 * 
 * @param request - Instance of the standard http or http2 request objects
 * @param reply - Instance of the standard http or http2 reply types
 */
const updateTask: HandlerBoardAndTask = async (request, reply) => {
  const task = await tasksService.updateTask(request.params.taskId, request.params.boardId, request.body);
  if (!task) {
    throw new NotFoundError(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
  }

  reply.send(task);
};

/**
 * Handler function for DELETE /boards/:boardId/tasks/:taskId request
 * 
 * @param request - Instance of the standard http or http2 request objects
 * @param reply - Instance of the standard http or http2 reply types
 */
const deleteTask: HandlerBoardAndTask = async (request, reply) => {
  const task = await tasksService.deleteTask(request.params.taskId, request.params.boardId);
  if (!task) {
    throw new NotFoundError(`Not found task by id ${request.params.taskId} and board id ${request.params.boardId}`);
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