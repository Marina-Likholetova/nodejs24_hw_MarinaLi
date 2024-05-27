const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { userDataValidator, userIdValidator } = require("../middlewares/validators/userValidators");
const { notFoundErrorHandler } = require("../middlewares/errorHandler");

const userRouter = Router();

userRouter.get("/", (_req, resp) => {
    resp.send([]);
});

userRouter.get("/:userId", userIdValidator, (req, resp) => {
    resp.send(req.params);
}, notFoundErrorHandler);

userRouter.post("/", userDataValidator, (_req, resp) => {
    resp.status(StatusCodes.CREATED).send("User created");
});

userRouter.delete("/:userId", userIdValidator, (_req, resp) => {
    resp.status(StatusCodes.NO_CONTENT).end();
}, notFoundErrorHandler);

userRouter.use((_req, resp) => {
    resp.status(404).send();
})

module.exports = {
    userRouter,
};
