import { v4 } from 'uuid';
import Column from '../column/column.model'
import { ColumnPayload } from './board.types'

/**
 * Board model for in-memory db
 */
class Board {
  id: string;

  title: string;

  columns: Column[];

  /**
   * Create a board
   * 
   * @constructor
   * @param {string} [title='Title'] Board's title
   * @param {ColumnPayload} [columns=[]] Board's columns 
   */
  constructor(
    title = 'Title',
    columns: ColumnPayload[] = []
  ) {
    this.id = v4();
    this.title = title;
    this.columns = columns.map(el => new Column(el.title, el.order));
  }
}

export default Board;
