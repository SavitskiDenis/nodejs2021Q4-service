import { v4 } from 'uuid';

/**
 * Task model for in-memory db
 */
class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  /**
   * Create a task
   * 
   * @constructor
   * @param {string} [title='Title'] Task's title
   * @param {string} [order=1] Task's order 
   * @param {string} [description='Desc'] Task's description
   * @param {string|null} [userId='P@55w0rd'] Task's userId
   * @param {string|null} [boardId='boardId'] Task's boardId
   * @param {string|null} [columnId='P@55w0rd'] Task's columnId
   */
  constructor(
    title = 'Title',
    order = 1,
    description = 'Desc',
    userId:string | null = null,
    boardId:string | null = 'boardId',
    columnId: string | null = null
  ) {
    this.id = v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
