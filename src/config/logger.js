const path = require('path');
const winston = require('winston');

const options = {
    file: {
        level: process.env.LOG_LEVEL_FILE,
        filename: path.join(__dirname, '../../app.log'),
        format: winston.format.json()
    },
    console: {
        level: process.env.LOG_LEVEL_CONSOLE
    },
};

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false,
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};

module.exports = logger;