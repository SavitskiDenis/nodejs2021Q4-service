import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService, UsersService],
})
export class LoginModule {}
