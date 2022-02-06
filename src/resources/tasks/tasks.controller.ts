import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../common/authentification';
import { TaskDTO } from './tasks.dto';
import { TasksService } from './tasks.service';
import { TaskResponse } from './tasks.types';
import HTTP_CODES from '../../common/http_codes';

const { CODE_OK, CODE_CREATED, CODE_NO_CONTENT } = HTTP_CODES;

@Controller('boards')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:boardId/tasks')
  @HttpCode(CODE_OK)
  async getAllTasks(@Param('boardId') boardId: string): Promise<TaskResponse[]> {
    const result = await this.tasksService.getAll(boardId);
    if (!Array.isArray(result)) {
      throw new NotFoundException(`Not found board by id ${boardId}`);
    }

    return result;
  }

  @Get('/:boardId/tasks/:taskId')
  @HttpCode(CODE_OK)
  async getTaskById(@Param('boardId') boardId: string, @Param('taskId') taskId: string): Promise<TaskResponse> {
    const task = await this.tasksService.getById(taskId, boardId);
    if (!task) {
      throw new NotFoundException(`Not found task by id ${taskId} and board id ${boardId}`);
    }

    return task;
  }

  @Post('/:boardId/tasks')
  @HttpCode(CODE_CREATED)
  addTask(@Param('boardId') boardId: string, @Body() body: TaskDTO): Promise<TaskResponse> {
    return this.tasksService.addTask(boardId, body);
  }

  @Put('/:boardId/tasks/:taskId')
  @HttpCode(CODE_OK)
  async updateTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() body: TaskDTO
  ): Promise<TaskResponse> {
    const task = await this.tasksService.updateTask(
      taskId,
      boardId,
      body
    );
    if (!task) {
      throw new NotFoundException(`Not found task by id ${taskId} and board id ${boardId}`);
    }

    return task;
  }

  @Delete('/:boardId/tasks/:taskId')
  @HttpCode(CODE_NO_CONTENT)
  async deleteTask(@Param('boardId') boardId: string, @Param('taskId') taskId: string): Promise<void> {
    const task = await this.tasksService.deleteTask(
      taskId,
      boardId
    );
    if (!task) {
      throw new NotFoundException(`Not found task by id ${taskId} and board id ${boardId}`);
    }
  }
}
