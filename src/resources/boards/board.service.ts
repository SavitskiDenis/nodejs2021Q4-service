import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';
import Board from './board.model';
import { BoardPayload } from './board.types'

/**
 * Function for getting all boards from in-memory db
 * 
 * @returns Array of boards
 */
const getAll = (): Board[] => boardsRepo.getAll();

/**
 * Function for getting board by id from in-memory db
 * 
 * @param id - Board's uuid
 * @returns Founded board or undefined
 */
const getById = (id: string): Board | undefined => boardsRepo.getById(id);

/**
 * Function for add new board in in-memory db and get it
 * 
 * @param payload - Data for new board
 * @returns Created board
 */
const addBoard = (payload: BoardPayload): Board => boardsRepo.add(payload);

/**
 * Function for update board by in in-memory db and get it
 * 
 * @param id - Board's uuid 
 * @param payload - Data for update board
 * @returns Updated board or null
 */
const updateBoard = (id: string, payload: BoardPayload): Board | null => boardsRepo.update(id, payload);

/**
 * Function for delete board's tasks and board from in-memeory db and get it
 * 
 * @param id - Board's uuid 
 * @returns Deleted board or null
 */
const deleteBoard = (id: string): Board | null => {
  tasksService.deleteTasksByBoardId(id);
  return boardsRepo._delete(id);
};

export default { getAll, getById, addBoard, updateBoard, deleteBoard };
