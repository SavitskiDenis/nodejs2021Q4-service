import { FastifyReply, FastifyRequest } from 'fastify';
import usersService from './user.service';
import HTTP_CODES from '../../common/http_codes';
import  { UserPayloadType } from './user.types';

const { CODE_CREATED, CODE_NO_CONTENT, CODE_NOT_FOUND } = HTTP_CODES;

/**
 * Fastify handler type for users
 */
type HandlerType = (
  request: FastifyRequest<{ Params: { userId: string }, Body: UserPayloadType }>,
  reply: FastifyReply
) => void;

/**
 * Handler function for GET /users request
 * 
 * @param _ Unused arg
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const getAllUsers: HandlerType = (_, reply) => {
  reply.send(usersService.getAll());
};

/**
 * Handler function for GET /users/:userId request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const getUserById: HandlerType = (request, reply) => {
  const user = usersService.getById(request.params?.userId);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.send(user);
};

/**
 * Handler function for POST /users request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const addUser: HandlerType = (request, reply) => {
  const user = usersService.addUser(request.body);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.code(CODE_CREATED).send(user);
};

/**
 * Handler function for PUT /users/:userId request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
const updateUser: HandlerType = (request, reply) => {
  const user = usersService.updateUser(request.params.userId, request.body);
  if (!user) {
    reply.code(CODE_NOT_FOUND);
    reply.send(`Not found user by id ${request.params.userId}`);
    return;
  }

  reply.send(user);
};

/**
 * Handler function for DELETE /users/:userId request
 * 
 * @param {FastifyRequest} request instance of the standard http or http2 request objects
 * @param {FastifyReply} reply instance of the standard http or http2 reply types
 */
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