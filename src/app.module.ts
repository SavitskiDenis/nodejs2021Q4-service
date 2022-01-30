import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from './resources/boards/boards.entity';
import { BoardsModule } from './resources/boards/boards.module';
import Column_ from './resources/columns/columns.entity';
import User from './resources/users/users.entity';
import { UsersModule } from './resources/users/users.module';
import { TasksModule } from './resources/tasks/tasks.module';
import Task from './resources/tasks/tasks.entity';
import { LoginModule } from './resources/login/login.module';
import { RequestMiddleware } from './middlewares/RequestMidlware';
import { FilesModule } from './resources/files/files.module';
import config from './common/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.TYPEORM_HOST,
      port: config.TYPEORM_PORT,
      username: config.TYPEORM_USERNAME,
      password: config.TYPEORM_PASSWORD,
      database: config.TYPEORM_DATABASE,
      synchronize: config.TYPEORM_SYNCHRONIZE,
      entities: [User, Board, Column_, Task],
      migrations: ['dist/migration/*.js'],
      migrationsRun: true
    }),
    BoardsModule,
    TasksModule,
    LoginModule,
    FilesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes('*')
  }
}
