import { compare } from 'bcrypt';
import { LoginPayloadType } from './login.types';
import userService from '../users/user.service';
import { createToken } from '../../common/authentification';


/**
 * Function check user and generate jwt auth token
 * 
 * @param payload - User's data for login
 * @returns Token or null
 */
const login = async (payload: LoginPayloadType): Promise<string | null> => {
  const users = await userService.getByLogin(payload.login);

  if (Array.isArray(users) && users.length > 0) {
    const match = await compare(payload.password, users[0].password);

    if (match) {
      return createToken(users[0].id,  users[0].login);
    }
  }

  return null;
};

export default { login };