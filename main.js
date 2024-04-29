require("dotenv").config();
const logger = require("./utils/logger")("main");
const fileSync = require("./file_sync");

logger.info("info message");
logger.warn("warn message");
logger.error("error message");

fileSync.start();
