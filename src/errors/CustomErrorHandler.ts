import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import logger from '../common/logger';
import HTTP_CODES from '../common/http_codes';

const handler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply ): void => {
  let code = HTTP_CODES.CODE_INTERNAL_SERVER_ERROR;
  const msg = error.message;

  if (error.validation) {
    code = 400;
    logger.warn(error);
  } else if (error.statusCode !== undefined) {
    code = error.statusCode;
  }

  if (code >= 500) {
    logger.error(error);
  } else {
    logger.warn(error);
  }

  reply.status(code).send(msg);
};

export default handler;