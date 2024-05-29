const userServices = require("../services/user_service.js")

const getUserlist = (_req, resp) => {
    const userList = userServices.getAllUsers();
    resp.render("pages/index", { userList })
}

const getAddUserForm = (_req, resp) => {
    resp.render("pages/add_user");
}

const addNewUser = (req, resp) => {
    userServices.createNewUser(req.body);
    resp.redirect("/");
}

const getEditUserForm = (req, resp) => {
    const { userId } = req.params;
    const userById = userServices.getUserById(userId);

    resp.render("pages/edit_user", { ...userById });
}

const editUser = (req, resp) => {
    const { userId } = req.params;
    userServices.updateUser(userId, req.body);
    resp.redirect("/");
}

const deleteUser = (req, resp) => {
    const { userId } = req.params;
    userServices.deleteUserById(userId)
    resp.redirect("/");
}

const getNotFoundPage = (_req, resp) => {
    resp.render("pages/not_found_page");
}

const getErrorPage = (err, _req, resp, _next) => {
    resp.status(500).render('pages/error', { message: err.message });
}

module.exports = {
    getUserlist,
    getAddUserForm,
    addNewUser,
    getEditUserForm,
    editUser,
    deleteUser,
    getNotFoundPage,
    getErrorPage
}