const winston = require('winston');
const { date } = require('./date');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
  )
);

const redMessageFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const redLevel = `\x1b[31m${level}\x1b[0m`;
    const redMessage = `\x1b[31m${message}\x1b[0m`;
    const formattedDate = `\x1b[31m${date(timestamp)}\x1b[0m`;
    return `\x1b[31m[\x1b[0m${formattedDate}\x1b[31m]\x1b[0m ${redLevel}\x1b[31m:\x1b[0m ${formattedDate}`;
  }
);

const greenMessageFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const greenLevel = `\x1b[32m${level}\x1b[0m`;
    const greenMessage = `\x1b[32m${message}\x1b[0m`;
    const formattedDate = `\x1b[32m${date(timestamp)}\x1b[0m`;
    return `\x1b[32m[\x1b[0m${formattedDate}\x1b[32m]\x1b[0m ${greenLevel}\x1b[32m:\x1b[0m ${greenMessage}`;
  }
);

const yellowMessageFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const yellowLevel = `\x1b[33m${level}\x1b[0m`;
    const yellowMessage = `\x1b[33m${message}\x1b[0m`;
    const formattedDate = `\x1b[33m${date(timestamp)}\x1b[0m`;
    return `\x1b[33m[\x1b[0m${formattedDate}\x1b[33m]\x1b[0m ${yellowLevel}\x1b[33m:\x1b[0m ${yellowMessage}`;
  }
);

const blueMessageFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const blueLevel = `\x1b[34m${level}\x1b[0m`;
    const blueMessage = `\x1b[34m${message}\x1b[0m`;
    const formattedDate = `\x1b[34m${date(timestamp)}\x1b[0m`;
    return `\x1b[34m[\x1b[0m${formattedDate}\x1b[34m]\x1b[0m ${blueLevel}\x1b[34m:\x1b[0m ${blueMessage}`;
  }
);

const whiteMessageFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const whiteLevel = `\x1b[37m${level}\x1b[0m`;
    const whiteMessage = `\x1b[37m${message}\x1b[0m`;
    const formattedDate = `\x1b[37m${date(timestamp)}\x1b[0m`;
    return `\x1b[37m[\x1b[0m${formattedDate}\x1b[37m]\x1b[0m ${whiteLevel}\x1b[37m:\x1b[0m ${whiteMessage}`;
  }
);

const loggerInfo = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    whiteMessageFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

const loggerError = winston.createLogger({
  level: 'http',
  format: winston.format.combine(winston.format.timestamp(), redMessageFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

const loggerHttp = winston.createLogger({
  level: 'http',
  format: winston.format.combine(winston.format.timestamp(), greenMessageFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

const loggerWarn = winston.createLogger({
  level: 'warn',
  format: winston.format.combine(
    winston.format.timestamp(),
    yellowMessageFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' }),
  ],
});

module.exports = {
  loggerInfo,
  loggerError,
  loggerHttp,
  loggerWarn,
};
