import winston from 'winston';

const { combine, timestamp, printf } = winston.format;
const logFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`);

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
   
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

export default logger;
