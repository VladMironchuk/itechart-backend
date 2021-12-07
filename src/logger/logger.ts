import winston from 'winston';
import * as path from 'path';
import * as expressWinston from 'express-winston';

const loggerFiles = {
  errorFile: {
    level: 'error',
    filename: path.resolve(__dirname, '../../', 'logs', 'errors.log'),
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxFiles: 5,
    maxsize: 5242880000,
  },
  reqFile: {
    filename: path.resolve(__dirname, '../../', 'logs', 'requests.log'),
    json: true,
    maxFiles: 5,
    maxsize: 5242880000,
  },
  infoFile: {
    level: 'info',
    filename: path.resolve(__dirname, '../../', 'logs', 'info.log'),
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxFiles: 5,
    maxsize: 5242880000,
  },
  debugFile: {
    level: 'debug',
    filename: path.resolve(__dirname, '../../', 'logs', 'debug.log'),
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxFiles: 5,
    maxsize: 5242880000,
  },
  console: {
    handleExceptions: true,
    handleRejections: true,
    colorize: true,
  },
};

export const reqLogger = expressWinston.logger({
  transports: [new winston.transports.File(loggerFiles.reqFile)],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp, stack, meta }) => {
      return `${timestamp} ${level}: ${stack || message}\n${JSON.stringify(meta)}`;
    })
  ),
});

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    })
  ),
  transports: [
    new winston.transports.File(loggerFiles.infoFile),
    new winston.transports.File(loggerFiles.debugFile),
    new winston.transports.Console(loggerFiles.console),
  ],
  exceptionHandlers: [new winston.transports.File(loggerFiles.errorFile)],
  exitOnError: true,
});

export const errorLogger = expressWinston.errorLogger({
  level: 'error',
  transports: [new winston.transports.File(loggerFiles.errorFile)],
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
});
