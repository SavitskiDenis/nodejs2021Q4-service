const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const addUser = (payload) => usersRepo.add(payload);

const updateUser = (id, payload) => usersRepo.update(id, payload);

const deleteUser = (id) => {
    tasksService.deleteTasksFromUser(id);
    return usersRepo._delete(id);
}

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
