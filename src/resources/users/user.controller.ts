import { FastifyReply, FastifyRequest } from 'fastify';
import usersService from './user.service';
import HTTP_CODES from '../../common/http_codes';
import  { UserPayloadType } from './user.types';

const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = HTTP_CODES;

type HandlerType = (
  request: FastifyRequest<{ Params: { userId: string }, Body: UserPayloadType }>,
  reply: FastifyReply
) => void;

const getAllUsers: HandlerType = (_, reply) => {
  reply.send(usersService.getAll());
};

const getUserById: HandlerType = (request, reply) => {
  const user = usersService.getById(request.params?.userId);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.send(user);
};

const addUser: HandlerType = (request, reply) => {
  const user = usersService.addUser(request.body);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.code(CODE_CREATED).send(user);
};

const updateUser: HandlerType = (request, reply) => {
  const user = usersService.updateUser(request.params.userId, request.body);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.send(user);
};

const deleteUser: HandlerType = (request, reply) => {
  const user = usersService.deleteUser(request.params.userId);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.code(CODE_NO_CONTENT).send();
}

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};