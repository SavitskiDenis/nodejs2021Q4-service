import { FastifyInstance, fastify, FastifyRegisterOptions, FastifyPluginOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from "http";
import path from 'path';
import swagger from 'fastify-swagger';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';
import boardRouter from './resources/boards/board.router';

const app: FastifyInstance<Server, IncomingMessage,ServerResponse> = fastify({ logger: true });

const swaggerOptions: FastifyRegisterOptions<FastifyPluginOptions> = {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml')
  }
};

app.register(swagger, swaggerOptions);

app.register(boardRouter);
app.register(taskRouter);
app.register(userRouter);

export default app;
