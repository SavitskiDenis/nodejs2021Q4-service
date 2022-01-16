import { createConnection } from 'typeorm';
import Config from './common/config';
import App from './app';

/**
 * Function for start fastify server
 * 
 * @param port - Server's port
 * 
 * @param host - Server's host
 */
const start = async (port: string, address: string): Promise<void> => {
  try {
    const connection = await createConnection();
    await connection.runMigrations();
    await App.listen(port, address);
  } catch (err) {
    App.log.error(err)
    process.exit(1)
  }
};

start(Config.PORT, Config.ADDRESS);
