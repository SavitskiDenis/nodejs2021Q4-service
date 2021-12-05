const boardsController = require('./board.controller');

const responseBoardSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          order: {
            type: 'integer'
          }
        }
      }
    }
  }
};

const requestParams = {
  boardId: {
    type: 'string',
    format: 'uuid'
  }
};

const requestBoardSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string'
          },
          order: {
            type: 'integer'
          }
        }
      }
    }
  },
  required: ['title', 'columns']
};

const getAllBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: responseBoardSchema
      }
    }
  },
  handler: boardsController.getAllBoards
};

const getBoardByIdOpts = {
  schema: {
    params: requestParams,
    response: {
      200: responseBoardSchema,
      404: {
        type: 'string'
      },
      400: {
        type: 'string'
      }
    }
  },
  handler: boardsController.getBoardById
};

const addBoardOpts = {
  schema: {
    body: requestBoardSchema,
    response: {
      201: responseBoardSchema,
      400: {
        type: 'string'
      }
    }
  },
  handler: boardsController.addBoard
};

const updateBoardOpts = {
  schema: {
    params: requestParams,
    body: requestBoardSchema,
    response: {
      200: responseBoardSchema,
      404: {
        type: 'string'
      },
      400: {
        type: 'string'
      }
    }
  },
  handler: boardsController.updateBoard
};

const deleteBoardOpts = {
  schema: {
    params: requestParams,
    response: {
      404: {
        type: 'string'
      },
      400: {
        type: 'string'
      }
    }
  },
  handler: boardsController.deleteBoard
};

const router = (fastify, _, done) => {
  fastify.get('/boards', getAllBoardsOpts);

  fastify.get('/boards/:boardId', getBoardByIdOpts);

  fastify.post('/boards', addBoardOpts);

  fastify.put('/boards/:boardId', updateBoardOpts);

  fastify.delete('/boards/:boardId', deleteBoardOpts);

  done();
};

module.exports = router;
