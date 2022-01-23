import { FastifyPluginCallback } from 'fastify';
import boardsController from './board.controller';
import HTTP_CODES from '../../common/http_codes';
import { authHook } from '../../common/authentification';

const { CODE_OK, CODE_CREATED, CODE_BAD_REQUEST, CODE_NOT_FOUND } = HTTP_CODES;

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
      [CODE_OK]: {
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
      [CODE_OK]: responseBoardSchema,
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
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
      [CODE_CREATED]: responseBoardSchema,
      [CODE_BAD_REQUEST]: {
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
      [CODE_OK]: responseBoardSchema,
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
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
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
        type: 'string'
      }
    }
  },
  handler: boardsController.deleteBoard
};

/**
 * Boards router for fastify
 * 
 * @param fastify - instance of fastify
 * @param _ - Unused arg
 * @param done - Done cb function
 */
const router: FastifyPluginCallback = (fastify, _, done) => {

  fastify.addHook("onRequest", authHook);

  fastify.get('/boards', getAllBoardsOpts);

  fastify.get('/boards/:boardId', getBoardByIdOpts);

  fastify.post('/boards', addBoardOpts);

  fastify.put('/boards/:boardId', updateBoardOpts);

  fastify.delete('/boards/:boardId', deleteBoardOpts);

  done();
};

export default router;
