import { v4 } from 'uuid';

class User {
  id: string;

  name: string;

  login: string;

  password: string;

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
