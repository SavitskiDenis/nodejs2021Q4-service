const tasksController = require('./task.controller');

const responseTaskSchema = {
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
    },
    description: {
      type: 'string'
    },
    userId: {
      type: ['string', 'null']
    },
    boardId: {
      type: 'string'
    },
    columnId: {
      type: ['string', 'null']
    }
  }
};

const requestBoardParams = {
  boardId: {
    type: 'string',
    format: 'uuid'
  }
};

const requestTaskParams = {
  taskId: {
    type: 'string',
    format: 'uuid'
  },
  boardId: {
    type: 'string',
    format: 'uuid'
  }
};

const requestUserSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    order: {
      type: 'integer'
    },
    description: {
      type: 'string'
    },
    userId: {
      type: ['string', 'null']
    },
    columnId: {
      type: ['string', 'null']
    }
  },
  required: ['title', 'order', 'description']
};

const getAllTasksOpts = {
  schema: {
    params: requestBoardParams,
    response: {
      200: {
        type: 'array',
        items: responseTaskSchema
      }
    }
  },
  handler: tasksController.getAllTasks
};

const getTaskByIdOpts = {
  schema: {
    params: requestTaskParams,
    response: {
      200: responseTaskSchema,
      404: {
        type: 'string'
      },
      400: {
        type: 'string'
      }
    }
  },
  handler: tasksController.getTaskById
};

const addTaskOpts = {
  schema: {
    params: requestBoardParams,
    body: requestUserSchema,
    response: {
      201: responseTaskSchema,
      400: {
        type: 'string'
      }
    }
  },
  handler: tasksController.addTask
};

const updateTaskOpts = {
  schema: {
    params: requestTaskParams,
    body: requestUserSchema,
    response: {
      200: responseTaskSchema,
      404: {
        type: 'string'
      },
      400: {
        type: 'string'
      }
    }
  },
  handler: tasksController.updateTask
};

const deleteTaskOpts = {
  schema: {
    params: requestTaskParams,
    response: {
      404: {
        type: 'string'
      },
      400: {
        type: 'string'
      }
    }
  },
  handler: tasksController.deleteTask
};

const router = (fastify, _, done) => {
  fastify.get('/boards/:boardId/tasks', getAllTasksOpts);

  fastify.get('/boards/:boardId/tasks/:taskId', getTaskByIdOpts);

  fastify.post('/boards/:boardId/tasks', addTaskOpts);

  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  done();
};

module.exports = router;
