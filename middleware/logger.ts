import winston from 'winston';
const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} - [${level.toUpperCase()}] ${message}`;
});

const logger: winston.Logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;