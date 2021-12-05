const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const addBoard = (payload) => boardsRepo.add(payload);

const updateBoard = (id, payload) => boardsRepo.update(id, payload);

const deleteBoard = (id) => {
    tasksService.deleteTasksByBoardId(id);
    return boardsRepo._delete(id);
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
