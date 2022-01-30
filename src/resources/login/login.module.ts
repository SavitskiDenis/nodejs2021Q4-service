import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, UsersService],
})
export class LoginModule {}
