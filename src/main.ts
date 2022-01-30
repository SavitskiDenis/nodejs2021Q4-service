import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import logger from './common/logger';
import config from './common/config';
import { CustomExceptionFilter } from './common/exception_filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(config.PORT, config.ADDRESS);
  logger.log(`Server listening ${config.ADDRESS}:${config.PORT}`);
}
bootstrap();
