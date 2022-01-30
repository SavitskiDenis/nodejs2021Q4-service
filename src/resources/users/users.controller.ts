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
import { UserResponse } from './users.types';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';
import HTTP_CODES from '../../common/http_codes';

const { CODE_OK, CODE_CREATED, CODE_NO_CONTENT } = HTTP_CODES;

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @HttpCode(CODE_OK)
  getAllUsers(): Promise<UserResponse[]> {
    return this.usersService.getAll();
  }

  @Get('/:id')
  @HttpCode(CODE_OK)
  async getUserById(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new NotFoundException(`Not found user by id ${id}`);
    }
    return user;
  }

  @Post('/')
  @HttpCode(CODE_CREATED)
  async addUser(@Body() body: UserDTO): Promise<UserResponse> {
    return this.usersService.addUser(body);
  }

  @Put('/:id')
  @HttpCode(CODE_OK)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UserDTO
  ): Promise<UserResponse> {
    const user = await this.usersService.updateUser(id, body);
    if (!user) {
      throw new NotFoundException(`Not found user by id ${id}`);
    }
    return user;
  }

  @Delete('/:id')
  @HttpCode(CODE_NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.deleteUser(id);
    if (!user) {
      throw new NotFoundException(`Not found user by id ${id}`);
    }
  }
}
