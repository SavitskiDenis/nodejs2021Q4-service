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
   * @param name - User's name
   * @defaultValue 'USER'
   * 
   * @param login - User's login
   * @defaultValue 'user'
   * 
   * @param password - User's password
   * @defaultValue 'P@55w0rd'
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
