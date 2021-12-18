import User from './user.model';
import  { UserPayloadType } from './user.types';

const users: User[] = [];


const getAll = (): User[] => users;
const getById = (id: string): User | undefined => users.find((el: User): boolean => el.id === id);

const add = (payload: UserPayloadType): User => {
  const user = new User(payload.name, payload.login, payload.password);
  users.push(user);

  return user;
};

const update = (id: string, payload: UserPayloadType): User | null => {
  const user = users.find(el => el.id === id);

  if (user) {
    user.name = payload.name;
    user.login = payload.login;
    user.password = payload.password;

    return user;
  }

  return null;
};

const _delete = (id: string): User | null => {
  const userIndex = users.findIndex(el => el.id === id);

  if (userIndex >= 0) {
    const user = users[userIndex];

    users.splice(userIndex, 1);

    return user;
  }

  return null;
};

export default { getAll, getById, add, update, _delete };
