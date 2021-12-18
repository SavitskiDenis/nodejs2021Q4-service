import { v4 } from 'uuid';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

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
