import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';
import Board from './board.model';
import { BoardPayload } from './board.types'


const getAll = (): Board[] => boardsRepo.getAll();

const getById = (id: string): Board | undefined => boardsRepo.getById(id);

const addBoard = (payload: BoardPayload): Board => boardsRepo.add(payload);

const updateBoard = (id: string, payload: BoardPayload): Board | null => boardsRepo.update(id, payload);

const deleteBoard = (id: string): Board | null => {
  tasksService.deleteTasksByBoardId(id);
  return boardsRepo._delete(id);
};

export default { getAll, getById, addBoard, updateBoard, deleteBoard };
