import { v4 } from 'uuid';

/**
 * User model for in-memory db
 */
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Create a user
   * 
   * @constructor
   * @param {string} [name='USER'] User's name
   * @param {string} [login='user'] User's login 
   * @param {string} [password='P@55w0rd'] User's password
   */
  constructor(
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  ) {
    this.id = v4();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

export default User;
