const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'Title',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(el => {
      const val = { ...el, id: uuid.v4() };
      return val;
    });
  }
}

module.exports = Board;
