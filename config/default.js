const colorsEnabled = +process.env.COLORS_ENABLED || 0;
const logLevel = process.env.LOG_LEVEL || 'warn';

module.exports = {
    logger: { colorsEnabled, logLevel },
    server: {
        port: +process.env.PORT || 3000,
    },
    morgan: {
        format: process.env.MORGAN_FORMAT || "dev",
    },
};