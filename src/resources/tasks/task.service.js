const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getById = (id, boardId) => tasksRepo.getById(id, boardId);

const addTask = (boardId, payload) => tasksRepo.add(boardId, payload);

const updateTask = (id, boardId, payload) => tasksRepo.update(id, boardId, payload);

const deleteTask = (id, boardId) => tasksRepo._delete(id, boardId);

const deleteTasksByBoardId = (boardId) => tasksRepo.deleteByBoardId(boardId);

const deleteTasksFromUser = (userId) => tasksRepo.deleteTasksFromUser(userId);

module.exports = { getAll, getById, addTask, updateTask, deleteTask, deleteTasksByBoardId, deleteTasksFromUser };
