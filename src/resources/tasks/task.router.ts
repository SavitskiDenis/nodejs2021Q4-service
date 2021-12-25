import { FastifyPluginCallback } from 'fastify';
import tasksController from './task.controller';
import HTTP_CODES from '../../common/http_codes';

const { CODE_OK, CODE_CREATED, CODE_BAD_REQUEST, CODE_NOT_FOUND } = HTTP_CODES;

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
      [CODE_OK]: {
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
      [CODE_OK]: responseTaskSchema,
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
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
      [CODE_CREATED]: responseTaskSchema,
      [CODE_BAD_REQUEST]: {
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
      [CODE_OK]: responseTaskSchema,
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
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
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
        type: 'string'
      }
    }
  },
  handler: tasksController.deleteTask
};

/**
 * Tasks router for fastify
 * 
 * @param fastify - Instance of fastify
 * @param _ - Unused arg
 * @param done - Done cb function
 */
const router: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get('/boards/:boardId/tasks', getAllTasksOpts);

  fastify.get('/boards/:boardId/tasks/:taskId', getTaskByIdOpts);

  fastify.post('/boards/:boardId/tasks', addTaskOpts);

  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  done();
};

export default router;
