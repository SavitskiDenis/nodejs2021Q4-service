const boardsService = require('./board.service');

const getAllBoards = (request, reply) => {
  reply.send(boardsService.getAll());
};

const getBoardById = (request, reply) => {
  const board = boardsService.getById(request.params.boardId);
  if (!board) {
    reply.code(404);
    reply.send(`Not found board by id ${request.params.boardId}`);
    return;
  }

  reply.send(board);
};

const addBoard = (request, reply) => {
  const board = boardsService.addBoard(request.body);

  reply.code(201).send(board);
};

const updateBoard = (request, reply) => {
  const board = boardsService.updateBoard(request.params.boardId, request.body);
  if (!board) {
    reply.code(404);
    reply.send(`Not found user by id ${request.params.boardId}`);
    return;
  }

  reply.send(board);
};

const deleteBoard = (request, reply) => {
  const board = boardsService.deleteBoard(request.params.boardId);
  if (!board) {
    reply.code(404);
    reply.send(`Not found boardId by id ${request.params.boardId}`);
    return;
  }

  reply.code(204);
  reply.send();
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};