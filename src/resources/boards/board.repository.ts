import Board from './board.entity';
import Column from '../column/column.entity'
import { BoardPayload } from './board.types'

/**
 * Function for getting all boards
 * 
 * @returns Array of boards
 */
const getAll = (): Promise<Board[]> => Board.find({ relations: ["columns"] });

/**
 * Function for getting board by id
 * 
 * @param id - Board's uuid 
 * @returns Found board or undefined
 */
const getById = (id: string): Promise<Board | undefined> => Board.findOne(id, { relations: ["columns"] });

/**
 * Function for create and add new board in db
 * 
 * @param payload - Data for new board
 * @returns Created board
 */
const add = async (payload: BoardPayload): Promise<Board> => {
  const board = await Board.create(payload);
  await board.save();

  const columns = await Promise.all(payload.columns.map(el => Column.create({ ...el, board })));
  await Promise.all(columns.map(el => el.save()));

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
  const board = await Board.findOne(id);

  if (board) {
    board.title = payload.title;
    await board.save();

    const boardColumns = await Column.find({
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
    await Promise.all(boardColumns.map(el => el.save()));

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
  const board = await Board.findOne(id);

  if (board) {
    await board.remove();

    return board;
  }

  return null;
};

export default { getAll, getById, add, update, _delete };
