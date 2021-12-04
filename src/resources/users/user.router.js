const usersController = require('./user.controller');

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
      200: {
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
      200: responseUserSchema,
      404: {
        type: 'string'
      },
      400: {
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
      201: responseUserSchema,
      404: {
        type: 'string'
      },
      400: {
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
      200: responseUserSchema,
      404: {
        type: 'string'
      },
      400: {
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
      404: {
        type: 'string'
      },
      400: {
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
