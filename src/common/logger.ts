import { pino, Logger } from 'pino';
import config from './config';

const { LOG_LEVEL, LOGS_DIR_PATH, LOGGER_TRANSLATE_TIME_FORMAT } = config;

const logger: Logger = pino({
  level: LOG_LEVEL,
  serializers: {
    req: (request) => ({
        method: request.method,
        url: request.url,
        queryString: request.query
      }
    )
  },
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'error',
        options: {
          colorize: false,
          translateTime: LOGGER_TRANSLATE_TIME_FORMAT,
          destination: `${LOGS_DIR_PATH}/errors.log`,
          mkdir: true
        }
      },
      {
        target: 'pino-pretty',
        level: 'trace',
        options: {
          destination: 1,
          translateTime: LOGGER_TRANSLATE_TIME_FORMAT
        },
      },
      {
        target: 'pino-pretty',
        level: 'trace',
        options: {
          colorize: false,
          translateTime: LOGGER_TRANSLATE_TIME_FORMAT,
          destination: `${LOGS_DIR_PATH}/trace.log`,
          mkdir: true
        }
      }
    ]
  }
});

export default logger;