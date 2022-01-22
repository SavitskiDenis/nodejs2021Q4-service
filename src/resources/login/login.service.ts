import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../../common/config';
import { LoginPayloadType } from './login.types';
import userService from '../users/user.service';


/**
 * Function check user and generate jwt auth token
 * 
 * @param payload - User's data for login
 * @returns Token or null
 */
const login = async (payload: LoginPayloadType): Promise<string | null> => {
  const users = await userService.getByLogin(payload.login);

  if (Array.isArray(users)) {
    const match = await compare(payload.password, users[0].password);

    if (match) {
      return sign({ id: users[0].id, login: users[0].login }, config.JWT_SECRET_KEY);
    }
  }

  return null;
};

export default { login };