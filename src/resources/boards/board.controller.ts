import { FastifyReply, FastifyRequest } from 'fastify';
import boardsService from './board.service';
import { BoardPayload } from './board.types'
import HTTP_CODES from '../../common/http_codes';

const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = HTTP_CODES;

type HandlerType = (
  request: FastifyRequest<{ Params: { boardId: string }, Body: BoardPayload }>,
  reply: FastifyReply
) => void;

const getAllBoards: HandlerType = (_, reply) => {
  reply.send(boardsService.getAll());
};

const getBoardById: HandlerType = (request, reply) => {
  const board = boardsService.getById(request.params.boardId);
  if (!board) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found board by id ${request.params.boardId}`);
    return;
  }

  reply.send(board);
};

const addBoard: HandlerType = (request, reply) => {
  const board = boardsService.addBoard(request.body);

  reply.code(CODE_CREATED).send(board);
};

const updateBoard: HandlerType = (request, reply) => {
  const board = boardsService.updateBoard(request.params.boardId, request.body);
  if (!board) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.boardId}`);
    return;
  }

  reply.send(board);
};

const deleteBoard: HandlerType = (request, reply) => {
  const board = boardsService.deleteBoard(request.params.boardId);
  if (!board) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found boardId by id ${request.params.boardId}`);
    return;
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