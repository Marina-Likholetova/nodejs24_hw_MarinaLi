const express = require("express");
const pagesRouter = express.Router();

const { userDataValidator, userIdValidator } = require("../middlewares/validators/userValidators");
const pagesUserController = require("../controllers/pages_controller.js");

const formDataParser = express.urlencoded({ extended: false });

// getUserlist
pagesRouter.route("/").get(pagesUserController.getUserlist);

// getAddUserForm and addNewUser
pagesRouter
    .route("/add-user")
    .get(pagesUserController.getAddUserForm)
    .post(formDataParser, userDataValidator, pagesUserController.addNewUser);

// getEditUserForm and editUser
pagesRouter
    .route("/:userId/edit")
    .all(userIdValidator)
    .get(pagesUserController.getEditUserForm)
    .post(formDataParser, userDataValidator, pagesUserController.editUser);

// deleteUser
pagesRouter.route("/:userId/delete").post(userIdValidator, pagesUserController.deleteUser);

// notFound page
pagesRouter.use(pagesUserController.getNotFoundPage);

//error page
pagesRouter.use(pagesUserController.getErrorPage);

module.exports = {
    pagesRouter,
};