const express = require("express");
const pagesRouter = express.Router();

const userServices = require("../services/user_service.js");
const { userDataValidator, userIdValidator } = require("../middlewares/validators/userValidators");

const formDataParser = express.urlencoded({ extended: false });

// getUserlist
pagesRouter.route("/").get((_req, resp) => {
    const userList = userServices.getAllUsers();
    resp.render("pages/index", { userList });
});

// getAddUserForm and addNewUser
pagesRouter
    .route("/add-user")
    .get((_req, resp) => {
        resp.render("pages/add_user");
    })
    .post(formDataParser, userDataValidator, (req, resp) => {
        userServices.createNewUser(req.body);
        resp.redirect("/");
    });

// getEditUserForm and editUser
pagesRouter
    .route("/:userId/edit")
    .all(userIdValidator)
    .get((req, resp) => {
        const { userId } = req.params;
        const userById = userServices.getUserById(userId);

        resp.render("pages/edit_user", { ...userById });
    })
    .post(formDataParser, userDataValidator, (req, resp) => {
        const { userId } = req.params;
        userServices.updateUser(userId, req.body);
        resp.redirect("/");
    });

// deleteUser
pagesRouter.route("/:userId/delete").post(userIdValidator, (req, resp) => {
    const { userId } = req.params;
    userServices.deleteUserById(userId);
    resp.redirect("/");
});

// notFound page
pagesRouter.use((_req, resp) => {
    resp.render("pages/not_found_page");
});

//error page
pagesRouter.use((err, _req, resp, _next) => {
    resp.status(500).render("pages/error", { message: err.message });
});

module.exports = {
    pagesRouter,
};