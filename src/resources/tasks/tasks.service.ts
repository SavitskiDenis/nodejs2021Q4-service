import { Injectable } from '@nestjs/common';
import Column_ from '../columns/columns.entity';
import User from '../users/users.entity';
import { TaskDTO } from './tasks.dto';
import Task from './tasks.entity';
import { TaskResponse } from './tasks.types';

@Injectable()
export class TasksService {
  /**
   * Function for map entity object to model
   *
   * @param entity - Task entity
   * @returns Task model
   */
  private mapEntityToResponse(entity: Task): TaskResponse {
    return {
      id: entity.id,
      title: entity.title,
      order: entity.order,
      description: entity.description,
      userId: entity.user ? entity.user.id : null,
      boardId: entity.board.id,
      columnId: entity.column ? entity.column.id : null,
    };
  }

  /**
   * Function for getting all task by board id from db
   *
   * @param boardId - Board's uuid
   * @returns Found array of tasks or undefined
   */
  getAll = async (boardId: string): Promise<TaskResponse[] | undefined> => {
    const result = await Task.find({
      where: { board: { id: boardId } },
      relations: ['board', 'column', 'user'],
    });

    return result?.map((el) => this.mapEntityToResponse(el));
  };

  /**
   * Function for getting task by id and board id from db
   *
   * @param id - Task's uuid
   * @param boardId - Board's uuid
   * @returns Found task or undefined
   */
  getById = async (
    id: string,
    boardId: string
  ): Promise<TaskResponse | undefined> => {
    const result = await Task.findOne({
      where: { id, board: { id: boardId } },
      relations: ['board', 'column', 'user'],
    });

    return result ? this.mapEntityToResponse(result) : undefined;
  };

  /**
   * Function for add new task in db and get it
   *
   * @param boardId - Board's uuid
   * @param payload - Data for new task
   * @returns Cretaed task
   */
  addTask = async (
    boardId: string,
    payload: TaskDTO
  ): Promise<TaskResponse> => {
    const task = await Task.create({
      title: payload.title,
      order: payload.order,
      description: payload.description,
      board: { id: boardId },
      user: typeof payload.userId === 'string' ? { id: payload.userId } : null,
      column:
        typeof payload.columnId === 'string' ? { id: payload.columnId } : null,
    });
    await task.save();

    return this.mapEntityToResponse(task);
  };

  /**
   * Function for update task by id and board id in db and get it
   *
   * @param id - Task's uuid
   * @param boardId - Board's uuid
   * @param payload - Data for update task
   * @returns Updated task or null
   */
  updateTask = async (
    id: string,
    boardId: string,
    payload: TaskDTO
  ): Promise<TaskResponse | null> => {
    const task = await Task.findOne({
      where: { id, board: { id: boardId } },
      relations: ['board', 'column', 'user'],
    });

    if (task) {
      let column = null;
      if (typeof payload.columnId === 'string') {
        column = await Column_.findOneOrFail(payload.columnId);
      }

      let user = null;
      if (typeof payload.userId === 'string') {
        user = await User.findOneOrFail(payload.userId);
      }

      task.title = payload.title;
      task.order = payload.order;
      task.description = payload.description;
      task.user = user;
      task.column = column;

      await task.save();
      return this.mapEntityToResponse(task);
    }

    return null;
  };

  /**
   * Function for delete task by id and board id from db and get it
   *
   * @param id - Task's uuid
   * @param boardId - Board's uuid
   * @returns Deleted task or null
   */
  deleteTask = async (
    id: string,
    boardId: string
  ): Promise<TaskResponse | null> => {
    const task = await Task.findOne({
      where: { id, board: { id: boardId } },
      relations: ['board', 'column', 'user'],
    });

    if (task) {
      await task.remove();

      return this.mapEntityToResponse(task);
    }

    return null;
  };
}
