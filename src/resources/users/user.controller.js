const usersService = require('./user.service');
const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = require('../../common/http_codes');

const getAllUsers = (request, reply) => {
  reply.send(usersService.getAll());
};

const getUserById = (request, reply) => {
  const user = usersService.getById(request.params.userId);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.send(user);
};

const addUser = (request, reply) => {
  const user = usersService.addUser(request.body);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.code(CODE_CREATED).send(user);
};

const updateUser = (request, reply) => {
  const user = usersService.updateUser(request.params.userId, request.body);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.send(user);
};

const deleteUser = (request, reply) => {
  const user = usersService.deleteUser(request.params.userId);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.code(CODE_NO_CONTENT).send();
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};