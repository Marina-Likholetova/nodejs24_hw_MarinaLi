const { StatusCodes } = require("http-status-codes");

const notFoundErrorHandler = (err, _req, resp, _next) => {
    resp.status(StatusCodes.NOT_FOUND).json({ error: err.message });
};

module.exports = {
    notFoundErrorHandler,
};
