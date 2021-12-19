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
   * @constructor
   * @param {string} [title='Title'] Column's title
   * @param {ColumnPayload} [order=0] Column's order 
   */
  constructor(title = 'Title', order = 0) {
    this.id = v4();
    this.title = title;
    this.order = order;
  }
}

export default Column;
