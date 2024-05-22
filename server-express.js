require("dotenv").config();
const { server: srvConfig, morgan: morganConfig } = require("config");

const express = require("express");
const morgan = require("morgan");

const logger = require('./utils/logger')('express srv');
const stream = require('./config/rotatingFileStreamConfig.js');
const { userRouter } = require("./router/users.js");
const jsonBodyParser = express.json();

const app = express();

app.listen(srvConfig.port, () => logger.info(`server is listening on [${srvConfig.port}] port`));

app.use(jsonBodyParser);

app.use(morgan(morganConfig.format, { stream }));

app.use('/users', userRouter);