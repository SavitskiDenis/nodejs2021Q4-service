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
import { BoardDTO } from './board.dto';
import { BoardsService } from './boards.service';
import { BoardResponse } from './boards.types';
import HTTP_CODES from '../../common/http_codes';

const { CODE_OK, CODE_CREATED, CODE_NO_CONTENT } = HTTP_CODES;

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  @HttpCode(CODE_OK)
  async getAllBoards(): Promise<BoardResponse[]> {
    return this.boardsService.getAll();
  }

  @Get('/:id')
  @HttpCode(CODE_OK)
  async getBoardById(@Param('id') id: string): Promise<BoardResponse> {
    const board = await this.boardsService.getById(id);
    if (!board) {
      throw new NotFoundException(`Not found board by id ${id}`);
    }

    return board;
  }

  @Post('/')
  @HttpCode(CODE_CREATED)
  addBoard(@Body() body: BoardDTO): Promise<BoardResponse> {
    return this.boardsService.addBoard(body);
  }

  @Put('/:id')
  @HttpCode(CODE_OK)
  async updateBoard(
    @Param('id') id: string,
    @Body() body: BoardDTO
  ): Promise<BoardResponse> {
    const board = await this.boardsService.updateBoard(id, body);
    if (!board) {
      throw new NotFoundException(`Not found board by id ${id}`);
    }

    return board;
  }

  @Delete('/:id')
  @HttpCode(CODE_NO_CONTENT)
  async deleteBoard(@Param('id') id: string): Promise<void> {
    const board = await this.boardsService.deleteBoard(id);
    if (!board) {
      throw new NotFoundException(`Not found board by id ${id}`);
    }
  }
}
