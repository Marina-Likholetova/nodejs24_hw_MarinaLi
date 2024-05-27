const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { userDataValidator, userIdValidator } = require("../middlewares/validators/userValidators");
const { notFoundErrorHandler } = require("../middlewares/errorHandler");
const apiUsersController = require("../controllers/users_controller.js")

const userRouter = Router();

userRouter.route("/")
    .get(apiUsersController.getUserList)
    .post(userDataValidator, apiUsersController.addUser);

userRouter.route("/:userId")
    .all(userIdValidator)
    .get(apiUsersController.getUserById)
    .delete(apiUsersController.deleteUserById)
    .all(notFoundErrorHandler)

userRouter.use((_req, resp) => {
    resp.status(StatusCodes.NOT_FOUND).send();
})

module.exports = {
    userRouter,
};
