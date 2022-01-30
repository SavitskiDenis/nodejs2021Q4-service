import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '../../.env'),
});

export default {
  PORT: process.env.PORT ?? '8888',
  ADDRESS: process.env.ADDRESS ?? 'localhost',
  LOG_LEVEL: process.env.LOG_LEVEL,
  LOGS_DIR_PATH: join(__dirname, '../../logs'),
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  SALT_ROUNDS: process.env.SALT_ROUNDS
    ? Number.parseInt(process.env.SALT_ROUNDS, 10)
    : 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'secret',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  USE_FASTIFY: process.env.USE_FASTIFY === 'true',
  TYPEORM_HOST: process.env.TYPEORM_HOST,
  TYPEORM_PORT: parseInt(process.env.TYPEORM_PORT, 10),
  TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
  TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE === 'true'
};
