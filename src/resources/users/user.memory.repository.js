const User = require('./user.model');

const users = [];

const getAll = () => users;
const getById = (id) => users.find(el => el.id === id);

const add = (payload) => {
  const user = new User(payload);
  users.push(user);

  return user;
};

const update = (id, payload) => {
  const user = users.find(el => el.id === id);

  if (user) {
    user.name = payload.name;
    user.login = payload.login;
    user.password = payload.password;

    return user;
  }

  return null;
};

const _delete = (id) => {
  const userIndex = users.findIndex(el => el.id === id);

  if (userIndex >= 0) {
    const user = users[userIndex];

    users.splice(userIndex, 1);

    return user;
  }

  return null;
};

module.exports = { getAll, getById, add, update, _delete };
