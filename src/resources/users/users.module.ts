import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from '../tasks/tasks.entity';
import { UsersController } from './users.controller';
import User from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
