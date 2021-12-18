import { v4 } from 'uuid';

class Column {
  id: string;

  title: string;

  order: number;

  constructor(title = 'Title', order = 0) {
    this.id = v4();
    this.title = title;
    this.order = order;
  }
}

export default Column;
