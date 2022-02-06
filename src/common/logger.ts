import { WinstonModule } from 'nest-winston';
import { level, transports, format } from 'winston';
import config from './config';

const { combine, timestamp, printf } = format;

const { LOG_LEVEL, LOGS_DIR_PATH } = config;

const levelsByIndex = new Map<number, level>([
  [0, 'error'],
  [1, 'warn'],
  [2, 'info'],
  [3, 'http'],
  [4, 'verbose'],
  [5, 'debug'],
  [6, 'silly']
]);

const logFormat = printf(({ level: levelInfo, message, timestamp: time }) => (`${time} [${levelInfo}] ${message}`));

const logger = WinstonModule.createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  level: levelsByIndex.get(parseInt(LOG_LEVEL, 10)) ?? 'debug',
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