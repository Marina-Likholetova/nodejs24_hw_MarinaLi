const { bgBlue, bgYellow, bgRed} = require('colors/safe');

function getLogger(moduleName) {
    return {
        info: (...args) => console.log(bgBlue(`${moduleName}:`), ...args),
        warn: (...args) => console.error(bgYellow(`${moduleName}:`), ...args),
        error: (...args) => console.error(bgRed(`${moduleName}:`), ...args),
    };
}

module.exports = getLogger;