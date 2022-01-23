import { FastifyReply, FastifyRequest } from 'fastify';
import { sign, verify } from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import config from './config';

export function createToken (id: string, login: string): string {
  return sign({ id, login }, config.JWT_SECRET_KEY)
}

export function authHook (req: FastifyRequest, reply: FastifyReply, done: () => void) {
  if (req.headers.authorization === undefined) {
    throw new UnauthorizedError('No token sent');
  }

  const [type, token] = req.headers.authorization.toString().split(' ');

  if (type !== 'Bearer' || !verify(token, config.JWT_SECRET_KEY)) {
    throw new UnauthorizedError('Incorrect token');
  }

  done();
}