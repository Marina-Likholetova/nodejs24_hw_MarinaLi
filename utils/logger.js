const { disable, bgBlue, bgYellow, bgRed } = require("colors/safe");
const { colorsEnabled, logLevel } = require("config");

function getLogger(moduleName) {
    !colorsEnabled && disable();

    return {
        info: (...args) => logLevel === "info" && console.log(bgBlue(`${moduleName}:`), ...args),
        warn: (...args) => logLevel !== "error" && console.error(bgYellow(`${moduleName}:`), ...args),
        error: (...args) => console.error(bgRed(`${moduleName}:`), ...args),
    };
}

module.exports = getLogger;