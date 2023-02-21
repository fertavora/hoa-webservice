import { createLogger, format, transports, Logger } from 'winston';

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${level} - ${message}`;
});

const outputFormat = format.combine(
  format.timestamp(),
  myFormat,
  format.json()
)

const logger:Logger = createLogger({
  level: 'info',
  format: outputFormat,
  defaultMeta: { service: 'hoa-webservice' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: './logs/error.log', level: 'error' }),
    new transports.File({ filename: './logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: outputFormat,
  }));
}

export default logger;
