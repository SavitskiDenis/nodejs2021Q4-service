import { getConnection } from 'typeorm';
import Board from './board.entity';
import Column from '../column/column.entity'
import { BoardPayload } from './board.types'

/**
 * Function for getting all boards
 * 
 * @returns Array of boards
 */
const getAll = (): Promise<Board[]> => getConnection().manager.find(Board, { relations: ["columns"] });

/**
 * Function for getting board by id
 * 
 * @param id - Board's uuid 
 * @returns Found board or undefined
 */
const getById = (id: string): Promise<Board | undefined> => getConnection().manager.findOne(Board, id, { relations: ["columns"] });

/**
 * Function for create and add new board in db
 * 
 * @param payload - Data for new board
 * @returns Created board
 */
const add = async (payload: BoardPayload): Promise<Board> => {
  const connection = getConnection();
  const board = await connection.manager.create(Board, payload);
  await connection.manager.save(board);

  const columns = await Promise.all(payload.columns.map(el => connection.manager.create(Column, { ...el, board })));

  await connection.manager.save(columns);

  board.columns = columns;

  return board;
};

/**
 * Function for update board by id
 * 
 * @param id - Board's uuid 
 * @param payload - Data for update board
 * @returns Updated board or null
 */
const update = async (id: string, payload: BoardPayload): Promise<Board | null> => {
  const connection = getConnection();
  const board = await connection.manager.findOne(Board, id);

  if (board) {
    board.title = payload.title;
    await connection.manager.save(board);

    const boardColumns = await connection.manager.find(Column, {
      where: {
        board
      }
    });

    for (let i = 0; i < boardColumns.length; i += 1) {
      if (i < payload.columns.length) {
        boardColumns[i].title = payload.columns[i].title;
        boardColumns[i].order = payload.columns[i].order;
      }
    }
    await connection.manager.save(boardColumns);

    board.columns = boardColumns;

    return board;
  }

  return null;
};

/**
 * Function for delete board from db by id
 * 
 * @param id - Board's uuid
 * @returns Deleted board or null
 */
const _delete = async (id: string): Promise<Board | null> => {
  const connection = getConnection();
  const board = await connection.manager.findOne(Board, id);

  if (board) {
    await connection.manager.remove(board);

    return board;
  }

  return null;
};

export default { getAll, getById, add, update, _delete };
