import winston from 'winston';
import config from '@/config';

const logger = winston.createLogger({
  level: config.logs.level,
  levels: config.logs.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.prettyPrint(),
    winston.format.json()
  ),
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'prod') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// esm caches the module after the inital execution
// subsequent imports use the cached logger module
export default logger;
