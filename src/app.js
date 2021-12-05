const fastify = require('fastify')({ logger: true });
const path = require('path');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml')
  },
});

fastify.register(boardRouter);
fastify.register(taskRouter);
fastify.register(userRouter);

const start = async (port) => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

module.exports = start;
