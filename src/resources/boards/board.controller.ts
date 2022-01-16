import { FastifyReply, FastifyRequest } from 'fastify';
import boardsService from './board.service';
import { BoardPayload } from './board.types'
import HTTP_CODES from '../../common/http_codes';
import NotFoundError from '../../errors/NotFoundError';

const { CODE_CREATED, CODE_NO_CONTENT } = HTTP_CODES;

/**
 * Fastify handler type for boards
 */
type HandlerType = (
  request: FastifyRequest<{ Params: { boardId: string }, Body: BoardPayload }>,
  reply: FastifyReply
) => Promise<void>;

/**
 * Handler function for GET /boards request
 * 
 * @param _ - Unused arg
 * @param reply - instance of the standard http or http2 reply types
 */
const getAllBoards: HandlerType = async (_, reply) => {
  reply.send(await boardsService.getAll());
};

/**
 * Handler function for GET /boards/:boardId request
 * 
 * @param request - instance of the standard http or http2 request objects
 * @param reply - instance of the standard http or http2 reply types
 */
const getBoardById: HandlerType = async (request, reply) => {
  const board = await boardsService.getById(request.params.boardId);
  if (!board) {
    throw new NotFoundError(`Not found board by id ${request.params.boardId}`);
  }

  reply.send(board);
};

/**
 * Handler function for POST /boards request
 * 
 * @param request - instance of the standard http or http2 request objects
 * @param reply - instance of the standard http or http2 reply types
 */
const addBoard: HandlerType = async (request, reply) => {
  const board = await boardsService.addBoard(request.body);

  reply.code(CODE_CREATED).send(board);
};

/**
 * Handler function for PUT /boards/:boardId request
 * 
 * @param request - instance of the standard http or http2 request objects
 * @param reply - instance of the standard http or http2 reply types
 */
const updateBoard: HandlerType = async (request, reply) => {
  const board = await boardsService.updateBoard(request.params.boardId, request.body);
  if (!board) {
    throw new NotFoundError(`Not found board by id ${request.params.boardId}`);
  }

  reply.send(board);
};

/**
 * Handler function for DELETE /boards/:boardId request
 * 
 * @param request - instance of the standard http or http2 request objects
 * @param reply - instance of the standard http or http2 reply types
 */
const deleteBoard: HandlerType = async (request, reply) => {
  const board = await boardsService.deleteBoard(request.params.boardId);
  if (!board) {
    throw new NotFoundError(`Not found board by id ${request.params.boardId}`);
  }

  reply.code(CODE_NO_CONTENT);
  reply.send();
};

export default {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};