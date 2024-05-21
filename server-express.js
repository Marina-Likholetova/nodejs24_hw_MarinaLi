require("dotenv").config();
const { server: srvConfig } = require("config");

const express = require("express");

const logger = require('./utils/logger')('express srv');

const app = express();

app.listen(srvConfig.port, () => logger.info(`server is listening on [${srvConfig.port}] port`));

app.get('/healthcheck', (req, resp) => {
    resp.send('healthcheck passed!');
});