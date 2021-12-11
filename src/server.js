const { PORT } = require('./common/config');
const app = require('./app');

const start = async (port) => {
  try {
    await app.listen(port);
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
};

start(PORT);
