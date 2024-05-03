const { disable, bgBlue, bgYellow, bgRed } = require("colors/safe");
const { colorsEnabled, logLevel } = require("config");
const fs = require("fs");
const path = require("path");

const logDirPath = path.resolve(process.cwd(), "logs");
const infoStreamPath = path.join(logDirPath, "info.log");
const errorStreamPath = path.join(logDirPath, "errors.log");

const logMessageTemplate = (moduleName, ...data) =>
    `${new Date().toISOString()} ${moduleName}: ${data.join(", ")}\n`;

try {
    fs.accessSync(logDirPath);
} catch (err) {
    fs.mkdirSync(logDirPath);
}

const infoStream = fs.createWriteStream(infoStreamPath, { encoding: "utf-8", flags: "a" });
const errorStream = fs.createWriteStream(errorStreamPath, { encoding: "utf-8", flags: "a" });

// error handling - ok?
infoStream.on("error", (err) => {
    console.log("Info stream error", err.message);
});

errorStream.on("error", (err) => {
    console.log("Error stream error", err.message);
});

// wrappers for writing data
const logToInfoFile = (moduleName, ...args) => {
    infoStream.write(logMessageTemplate(moduleName, ...args));
};

const logToErrorFile = (moduleName, ...args) => {
    errorStream.write(logMessageTemplate(moduleName, ...args));
};

function getLogger(moduleName) {
    !colorsEnabled && disable();

    return {
        info: (...args) => {
            logToInfoFile(moduleName, ...args);
            logLevel === "info" && console.log(bgBlue(`${moduleName}:`), ...args);
        },
        warn: (...args) => {
            logToErrorFile(moduleName, ...args);
            logLevel !== "error" && console.error(bgYellow(`${moduleName}:`), ...args);
        },
        error: (...args) => {
            logToErrorFile(moduleName, ...args);
            console.error(bgRed(`${moduleName}:`), ...args);
        },
    };
}

process.on("beforeExit", () => {
    infoStream.end();
    errorStream.end();
});

module.exports = getLogger;
