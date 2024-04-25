const dotenv = require("dotenv").config();
const logger = require("./utils/logger")("main");

logger.info("info message");
logger.warn("warn message");
logger.error("error message");
