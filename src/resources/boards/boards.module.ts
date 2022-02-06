import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Column_ from '../columns/columns.entity';
import { BoardsController } from './boards.controller';
import Board from './boards.entity';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Column_])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
