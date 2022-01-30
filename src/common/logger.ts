import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import config from './config';

const { LOG_LEVEL, LOGS_DIR_PATH } = config;

const logger = WinstonModule.createLogger({
  level: 'debug',
  transports: [
    new transports.File({
      level: 'error',
      filename: `${LOGS_DIR_PATH}/errors.log`,
    }),
    new transports.File({ level: 'info', filename: `${LOGS_DIR_PATH}/trace.log` }),
    new transports.Console({ level: 'info' }),
  ]
});

export default logger;