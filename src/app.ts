import { FastifyInstance, fastify, FastifyRegisterOptions, FastifyPluginOptions, FastifyServerOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from "http";
import path from 'path';
import swagger from 'fastify-swagger';
import HTTP_CODES from './common/http_codes';
import NotFoundError from './errors/NotFoundError';
import logger from './common/logger';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import boardRouter from './resources/boards/board.router';

const serverOptions: FastifyServerOptions = { logger };

const app: FastifyInstance<Server, IncomingMessage,ServerResponse> = fastify(serverOptions);

const swaggerOptions: FastifyRegisterOptions<FastifyPluginOptions> = {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml')
  }
};

app.register(swagger, swaggerOptions);

app.addHook('preValidation', (req, _, done) => {
  req.log.info({ body: req.body || null }, 'Request\'s body');
  done();
});

app.register(boardRouter);
app.register(taskRouter);
app.register(userRouter);

app.setNotFoundHandler((request) => {
  throw new NotFoundError(`Not found ${request.method} ${request.url}`);
});

app.setErrorHandler((error, _, reply) => {
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
});

process.on('uncaughtException', (error) => {
  logger.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(reason);
  process.exit(1);
});

export default app;
