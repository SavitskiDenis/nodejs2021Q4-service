const usersController = require('./user.controller');
const { CODE_OK, CODE_CREATED, CODE_BAD_REQUEST, CODE_NOT_FOUND } = require('../../common/http_codes');

const responseUserSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    login: {
      type: 'string'
    }
  }
};

const responseParams = {
  userId: {
    type: 'string',
    format: 'uuid'
  }
};

const requestUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    login: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['name', 'login', 'password']
};

const getAllUsersOpts = {
  schema: {
    response: {
      [CODE_OK]: {
        type: 'array',
        items: responseUserSchema
      }
    }
  },
  handler: usersController.getAllUsers
};

const getUserByIdOpts = {
  schema: {
    params: responseParams,
    response: {
      [CODE_OK]: responseUserSchema,
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
        type: 'string'
      }
    }
  },
  handler: usersController.getUserById
};

const addUserOpts = {
  schema: {
    body: requestUserSchema,
    response: {
      [CODE_CREATED]: responseUserSchema,
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
        type: 'string'
      }
    }
  },
  handler: usersController.addUser
};

const updateUserOpts = {
  schema: {
    params: responseParams,
    body: requestUserSchema,
    response: {
      [CODE_OK]: responseUserSchema,
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
        type: 'string'
      }
    }
  },
  handler: usersController.updateUser
};

const deleteUserOpts = {
  schema: {
    params: responseParams,
    response: {
      [CODE_NOT_FOUND]: {
        type: 'string'
      },
      [CODE_BAD_REQUEST]: {
        type: 'string'
      }
    }
  },
  handler: usersController.deleteUser
};

const router = (fastify, _, done) => {
  fastify.get('/users', getAllUsersOpts);

  fastify.get('/users/:userId', getUserByIdOpts);

  fastify.post('/users', addUserOpts);

  fastify.put('/users/:userId', updateUserOpts);

  fastify.delete('/users/:userId', deleteUserOpts);

  done();
};

module.exports = router;
