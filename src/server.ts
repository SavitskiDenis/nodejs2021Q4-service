import Config from './common/config';
import App from './app'

/**
 * Function for start fastify server
 * 
 * @param port - Server's port
 */
const start = async (port: string): Promise<void> => {
  try {
    await App.listen(port);
  } catch (err) {
    App.log.error(err)
    process.exit(1)
  }
};

start(Config.PORT);
