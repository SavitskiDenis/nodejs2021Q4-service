import boardsRepo from './board.repository';
import Board from './board.entity';
import { BoardPayload } from './board.types'

/**
 * Function for getting all boards from db
 * 
 * @returns Array of boards
 */
const getAll = (): Promise<Board[]> => boardsRepo.getAll();

/**
 * Function for getting board by id from db
 * 
 * @param id - Board's uuid
 * @returns Founded board or undefined
 */
const getById = (id: string): Promise<Board | undefined> => boardsRepo.getById(id);

/**
 * Function for add new board in db and get it
 * 
 * @param payload - Data for new board
 * @returns Created board
 */
const addBoard = (payload: BoardPayload): Promise<Board> => boardsRepo.add(payload);

/**
 * Function for update board by in db and get it
 * 
 * @param id - Board's uuid 
 * @param payload - Data for update board
 * @returns Updated board or null
 */
const updateBoard = (id: string, payload: BoardPayload): Promise<Board | null> => boardsRepo.update(id, payload);

/**
 * Function for delete board's tasks and board from db and get it
 * 
 * @param id - Board's uuid 
 * @returns Deleted board or null
 */
const deleteBoard = (id: string): Promise<Board | null> => boardsRepo._delete(id);

export default { getAll, getById, addBoard, updateBoard, deleteBoard };
