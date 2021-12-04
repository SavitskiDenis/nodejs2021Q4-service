const Board = require('./board.model');

const boards = [];

const getAll = () => boards;

const getById = (id) => boards.find(el => el.id === id);

const add = (payload) => {
  const board = new Board(payload);
  boards.push(board);

  return board;
};

const update = (id, payload) => {
  const board = boards.find(el => el.id === id);

  if (board) {
    board.title = payload.title;
    board.columns = payload.columns;

    return board;
  }

  return null;
};

const _delete = (id) => {
  const boardIndex = boards.findIndex(el => el.id === id);

  if (boardIndex >= 0) {
    const board = boards[boardIndex];

    boards.splice(boardIndex, 1);

    return board;
  }

  return null;
};

module.exports = { getAll, getById, add, update, _delete };
