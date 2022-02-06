import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Column_ from '../columns/columns.entity';
import User from '../users/users.entity';
import { TasksController } from './tasks.controller';
import Task from './tasks.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Column_, User])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
