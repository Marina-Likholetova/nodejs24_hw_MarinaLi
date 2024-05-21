require("dotenv").config();
const { server: srvConfig } = require("config");

const express = require("express");
const morgan = require("morgan");

const logger = require('./utils/logger')('express srv');
const stream = require('./config/rotatingFileStreamConfig.js');

const app = express();

app.listen(srvConfig.port, () => logger.info(`server is listening on [${srvConfig.port}] port`));

const accessLogger = morgan(':date :method :url :status', { stream });

app.use(accessLogger);

app.get('/healthcheck', (req, resp) => {
    resp.send('healthcheck passed!');
});