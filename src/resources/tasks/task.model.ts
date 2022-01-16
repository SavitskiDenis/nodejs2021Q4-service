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
   * @param title - Task's title
   * @defaultValue 'Title'
   * 
   * @param order - Task's order
   * @defaultValue 1
   * 
   * @param description - Task's description
   * @defaultValue 'Desc'
   * 
   * @param userId - Task's userId
   * @defaultValue null
   * 
   * @param boardId - Task's boardId
   * @defaultValue 'boardId'
   * 
   * @param columnId - Task's columnId
   * @defaultValue 'P@55w0rd'
   */
  constructor(
    id: string,
    title = 'Title',
    order = 1,
    description = 'Desc',
    userId:string | null = null,
    boardId:string | null = 'boardId',
    columnId: string | null = null
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
