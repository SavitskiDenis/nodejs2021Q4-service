import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginTDO } from './login.dto';
import HTTP_CODES from '../../common/http_codes';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/')
  @HttpCode(HTTP_CODES.CODE_OK)
  async login(@Body() body: LoginTDO): Promise<{ token: string }> {
    const token = await this.loginService.login(body);

    if (token === null) {
      throw new NotFoundException(`Not found user with login: ${body.login} and password: ${body.password}`);
    }

    return { token };
  }
}
