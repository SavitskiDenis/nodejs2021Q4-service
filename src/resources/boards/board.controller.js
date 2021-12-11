const boardsService = require('./board.service');
const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = require('../../common/http_codes');

const getAllBoards = (request, reply) => {
  reply.send(boardsService.getAll());
};

const getBoardById = (request, reply) => {
  const board = boardsService.getById(request.params.boardId);
  if (!board) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found board by id ${request.params.boardId}`);
    return;
  }

  reply.send(board);
};

const addBoard = (request, reply) => {
  const board = boardsService.addBoard(request.body);

  reply.code(CODE_CREATED).send(board);
};

const updateBoard = (request, reply) => {
  const board = boardsService.updateBoard(request.params.boardId, request.body);
  if (!board) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.boardId}`);
    return;
  }

  reply.send(board);
};

const deleteBoard = (request, reply) => {
  const board = boardsService.deleteBoard(request.params.boardId);
  if (!board) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found boardId by id ${request.params.boardId}`);
    return;
  }

  reply.code(CODE_NO_CONTENT);
  reply.send();
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};