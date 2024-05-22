require("dotenv").config();
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const logger = require("./utils/logger")("server");
const { server: serverConfig } = require("config");

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

const endpointMap = {
    "^/healthcheck$": {
        GET: [handleHealthcheck],
    },
};

const srv = http.createServer();

srv.listen(serverConfig.port);

srv.on("request", async (req, resp) => {
    const [, handlersByMethods = {}] =
        Object.entries(endpointMap).find(([endpointUrl]) => {
            const reg = new RegExp(endpointUrl);
            return reg.test(req.url);
        }) || [];

    const middlewareChain = handlersByMethods[req.method] || [handleNotFound];

    try {
        for (let i = 0; i < middlewareChain.length; i++) {
            await middlewareChain[i](req, resp);
        }
    } catch (err) {
        logger.error(err);

        const respStatus = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
        const respData = err.data || "Server error, try again later";

        resp.statusCode = respStatus;
        resp.end(JSON.stringify(respData));
    }
});
