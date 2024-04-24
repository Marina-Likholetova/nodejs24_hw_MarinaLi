function getLogger(fileName) {
    return {
        info: (msg) => {
            console.log(`${fileName}: ${msg}`);
        },
        warn: (msg) => {
            console.error(`${fileName}: ${msg}`);
        },
        error: (msg) => {
            console.error(`${fileName}: ${msg}`);
        },
    };
}

module.exports = getLogger;