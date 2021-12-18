import { v4 } from 'uuid';
import Column from '../column/column.model'
import { ColumnPayload } from './board.types'


class Board {
  id: string;

  title: string;

  columns: Column[];

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
