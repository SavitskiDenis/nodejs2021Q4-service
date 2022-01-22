import { FastifyInstance, fastify, FastifyRegisterOptions, FastifyPluginOptions, FastifyServerOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from "http";
import path from 'path';
import swagger from 'fastify-swagger';
import NotFoundError from './errors/NotFoundError';
import logger from './common/logger';
import customErrorHandler from './errors/CustomErrorHandler';

import loginRouter from './resources/login/login.router';
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

app.register(loginRouter);
app.register(boardRouter);
app.register(taskRouter);
app.register(userRouter);

app.setNotFoundHandler((request) => {
  throw new NotFoundError(`Not found ${request.method} ${request.url}`);
});

app.setErrorHandler(customErrorHandler);

process.on('uncaughtException', (error) => {
  logger.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(reason);
  process.exit(1);
});

export default app;
