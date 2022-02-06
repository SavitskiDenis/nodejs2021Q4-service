import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from 'fastify-multipart';
import { AppModule } from './app.module';
import logger from './common/logger';
import config from './common/config';
import { ExpressExceptionFilter } from './filters/express.filter';
import { FastifyExceptionFilter } from './filters/fastify.filter';

async function bootstrap() {
  let app;
  if (config.USE_FASTIFY) {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.register(fastifyMultipart);
    app.useGlobalFilters(new FastifyExceptionFilter());
  } else {
    app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExpressExceptionFilter());
  }

  // app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.PORT, config.ADDRESS);
  logger.log(`Server listening ${config.ADDRESS}:${config.PORT}`);
}
bootstrap();
