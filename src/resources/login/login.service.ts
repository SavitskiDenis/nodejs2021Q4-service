import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { LoginTDO } from './login.dto';
import { createToken } from '../../common/authentification';
import { UsersService } from '../users/users.service';

@Injectable()
export class LoginService {
  constructor(private userService: UsersService) {}

  /**
   * Function check user and generate jwt auth token
   *
   * @param payload - User's data for login
   * @returns Token or null
   */
  login = async (payload: LoginTDO): Promise<string | null> => {
    const users = await this.userService.getByLogin(payload.login);

    if (Array.isArray(users) && users.length > 0) {
      const match = await compare(payload.password, users[0].password);

      if (match) {
        return createToken(users[0].id, users[0].login);
      }
    }

    return null;
  };
}
