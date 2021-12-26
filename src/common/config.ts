import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export default {
  PORT: process.env.PORT ?? '8888',
  LOG_LEVEL: process.env.LOG_LEVEL,
  LOGS_DIR_PATH: path.join(__dirname, '../../logs'),
  LOGGER_TRANSLATE_TIME_FORMAT: 'yyyy-mm-dd HH:MM:ss',
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};
