import Board from './board.model';
import { BoardPayload } from './board.types'

const boards: Board[] = [];

/**
 * Function for getting all boards
 * 
 * @returns Array of boards
 */
const getAll = (): Board[] => boards;

/**
 * Function for getting board by id
 * 
 * @param id - Board's uuid 
 * @returns Found board or undefined
 */
const getById = (id: string): Board | undefined => boards.find(el => el.id === id);

/**
 * Function for create and add new board in array
 * 
 * @param payload - Data for new board
 * @returns Created board
 */
const add = (payload: BoardPayload): Board => {
  const board = new Board(payload.title, payload.columns);
  boards.push(board);

  return board;
};

/**
 * Function for update board by id
 * 
 * @param id - Board's uuid 
 * @param payload - Data for update board
 * @returns Updated board or null
 */
const update = (id: string, payload: BoardPayload): Board | null => {
  const board = boards.find(el => el.id === id);

  if (board) {
    board.title = payload.title;
    for (let i = 0; i < board.columns.length; i += 1) {
      if (i < payload.columns.length) {
        board.columns[i].title = payload.columns[i].title;
        board.columns[i].order = payload.columns[i].order;
      }
    }

    return board;
  }

  return null;
};

/**
 * Function for delete board from array by id
 * 
 * @param id - Board's uuid
 * @returns Deleted board or null
 */
const _delete = (id: string): Board | null => {
  const boardIndex = boards.findIndex(el => el.id === id);

  if (boardIndex >= 0) {
    const board = boards[boardIndex];

    boards.splice(boardIndex, 1);

    return board;
  }

  return null;
};

export default { getAll, getById, add, update, _delete };
