import { Injectable } from '@nestjs/common';
import Column_ from '../columns/columns.entity';
import { BoardDTO } from './board.dto';
import Board from './boards.entity';
import { BoardResponse } from './boards.types';


@Injectable()
export class BoardsService {
  private sortColumns(columns: Column_[]): void {
    columns.sort((a, b) => a.order - b.order);
  }

  private mapEntityToResponse = (entity: Board): BoardResponse => ({
    id: entity.id,
    title: entity.title,
    columns: entity.columns.map((el) => ({
      id: el.id,
      title: el.title,
      order: el.order,
    })),
  });

  /**
   * Function for getting all boards from db
   *
   * @returns Array of boards
   */
  getAll = async (): Promise<BoardResponse[]> => {
    const boards = await Board.find({ relations: ['columns'] });

    boards.forEach((board) => this.sortColumns(board.columns));

    return boards.map((el) => this.mapEntityToResponse(el));
  };

  /**
   * Function for getting board by id from db
   *
   * @param id - Board's uuid
   * @returns Founded board or undefined
   */
  getById = async (id: string): Promise<BoardResponse | undefined> => {
    const board = await Board.findOne(id, { relations: ['columns'] });

    if (board) {
      this.sortColumns(board.columns);

      return this.mapEntityToResponse(board);
    }

    return undefined;
  };

  /**
   * Function for add new board in db and get it
   *
   * @param payload - Data for new board
   * @returns Created board
   */
  addBoard = async (payload: BoardDTO): Promise<BoardResponse> => {
    const board = await Board.create(payload);
    await board.save();

    const columns = await Promise.all(
      payload.columns.map((el) => Column_.create({ ...el, board }))
    );
    await Promise.all(columns.map((el) => el.save()));
    // this.sortColumns(columns);

    board.columns = columns;

    return this.mapEntityToResponse(board);
  };

  /**
   * Function for update board by in db and get it
   *
   * @param id - Board's uuid
   * @param payload - Data for update board
   * @returns Updated board or null
   */
  updateBoard = async (
    id: string,
    payload: BoardDTO
  ): Promise<BoardResponse | null> => {
    const board = await Board.findOne(id);

    if (board) {
      board.title = payload.title;
      await board.save();

      const boardColumns = await Column_.find({
        where: {
          board,
        },
      });

      for (let i = 0; i < boardColumns.length; i += 1) {
        if (i < payload.columns.length) {
          boardColumns[i].title = payload.columns[i].title;
          boardColumns[i].order = payload.columns[i].order;
        }
      }
      await Promise.all(boardColumns.map((el) => el.save()));
      this.sortColumns(boardColumns);

      board.columns = boardColumns;

      return this.mapEntityToResponse(board);
    }

    return null;
  };

  /**
   * Function for delete board's tasks and board from db and get it
   *
   * @param id - Board's uuid
   * @returns Deleted board or null
   */
  deleteBoard = async (id: string): Promise<Board | null> => {
    const board = await Board.findOne(id);

    if (board) {
      await board.remove();

      return board;
    }

    return null;
  };
}
