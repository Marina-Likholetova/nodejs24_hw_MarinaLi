const { StatusCodes } = require("http-status-codes");
const userService = require("../services/user_service.js");

const getUserList = (_req, resp) => {
    const userList = userService.getAllUsers();
    resp.send(userList);
};

const getUserById = (req, resp) => {
    const { userId } = req.params;

    const userById = userService.getUserById(userId);
    resp.json(userById);
};

const addUser = (req, resp) => {
    userService.createNewUser(req.body);
    resp.status(StatusCodes.CREATED).send(req.body);
};

const updateUser = (req, resp) => {
    const { userId } = req.params;
    const user = userService.updateUser(userId, req.body);
    resp.json(user);
};

const deleteUserById = (req, resp) => {
    const { userId } = req.params;

    userService.deleteUserById(userId);
    resp.status(StatusCodes.NO_CONTENT).send();
};

module.exports = {
    getUserList,
    getUserById,
    addUser,
    updateUser,
    deleteUserById,
};
