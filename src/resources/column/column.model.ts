import { v4 } from 'uuid';

/**
 * Column model for in-memory db
 */
class Column {
  id: string;

  title: string;

  order: number;

  /**
   * Create a column
   * 
   * @param title - Column's title
   * @defaultValue 'Title'
   * 
   * @param order - Column's order
   * @defaultValue 0 
   */
  constructor(title = 'Title', order = 0) {
    this.id = v4();
    this.title = title;
    this.order = order;
  }
}

export default Column;
