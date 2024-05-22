const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { userDataValidator, userIdValidator } = require("../middlewares/validators/userValidators");

const userRouter = Router();

userRouter.get("/", (_req, resp) => {
    resp.send([]);
});

userRouter.get("/:userId", userIdValidator, (req, resp) => {
    resp.send(req.params);
});

userRouter.post("/", userDataValidator, (_req, resp) => {
    resp.status(StatusCodes.CREATED).send("User created");
});

userRouter.delete("/:userId", userIdValidator, (_req, resp) => {
    resp.status(StatusCodes.NO_CONTENT).end();
});

module.exports = {
    userRouter,
};
