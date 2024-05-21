const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");

const userRouter = Router();

userRouter.get("/", (_req, resp) => {
    resp.send([]);
});

userRouter.get("/:userId", (req, resp) => {
    resp.send(req.params);
});

userRouter.post("/", (_req, resp) => {
    resp.status(StatusCodes.CREATED).send("User created");
});

userRouter.delete("/:userId", (_req, resp) => {
    resp.status(StatusCodes.NO_CONTENT).end();
});

module.exports = {
    userRouter,
};
