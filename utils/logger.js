function getLogger(moduleName) {
    return {
        info: (...args) => console.log(`${moduleName}:`, ...args),
        warn: (...args) => console.error(`${moduleName}:`, ...args),
        error: (...args) => console.error(`${moduleName}:`, ...args),
    };
}

module.exports = getLogger;