import { FastifyReply, FastifyRequest } from 'fastify';
import loginService from './login.service';
import HTTP_CODES from '../../common/http_codes';
import { LoginPayloadType } from './login.types';
import ForbiddenError from '../../errors/ForbiddenError';
import config from '../../common/config';

const { CODE_OK } = HTTP_CODES;

/**
 * Fastify handler type for tasks with boardId param
 */
type HandlerLogin = (
  request: FastifyRequest<{ Body: LoginPayloadType }>,
  reply: FastifyReply
) => Promise<void>;

/**
 * Handler function for POST /login request
 * 
 * @param request - Instance of the standard http or http2 request objects
 * @param reply - Instance of the standard http or http2 reply types
 */
const login: HandlerLogin = async (request, reply) => {
  const token = await loginService.login(request.body);

  if (token === null) {
    throw new ForbiddenError(`Not found user with login: ${request.body.login} and password: ${request.body.password}`);
  }

  reply.code(CODE_OK).send({ token });
};

export default { login }