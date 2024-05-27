const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { userDataValidator, userIdValidator } = require("../middlewares/validators/userValidators");
const { notFoundErrorHandler } = require("../middlewares/errorHandler");
const apiUsersController = require("../controllers/users_controller.js")

const userRouter = Router();

userRouter.get("/", apiUsersController.getUserList);

userRouter.get("/:userId", userIdValidator, apiUsersController.getUserById, notFoundErrorHandler);

userRouter.post("/", userDataValidator, apiUsersController.addUser);

userRouter.delete("/:userId", userIdValidator, apiUsersController.deleteUserById, notFoundErrorHandler);

userRouter.use((_req, resp) => {
    resp.status(StatusCodes.NOT_FOUND).send();
})

module.exports = {
    userRouter,
};
