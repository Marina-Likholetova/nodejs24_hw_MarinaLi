require("dotenv").config();
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const logger = require("./utils/logger")("server");
const { server: serverConfig } = require("config")

const healthcheckUrl = "/healthcheck";

const handleHealthcheck = (req, resp) => {
    resp.writeHead(StatusCodes.OK, { "Content-Type": "text/plain" });
    logger.info(`${req.method} ${req.url} ${resp.statusCode}`);
    resp.end("healthcheck passed");
};

const handleNotFound = (req, resp) => {
    resp.writeHead(StatusCodes.NOT_FOUND, { "Content-Type": "text/plain" });
    logger.warn(`${req.method} ${req.url} ${resp.statusCode}`);
    resp.end("Not found");
};

const srv = http.createServer();

srv.listen(serverConfig.port);

srv.on("request", (req, resp) => {
    if (req.method === "GET" && req.url === healthcheckUrl) {
        handleHealthcheck(req, resp);
        return;
    }

    handleNotFound(req, resp);
});
