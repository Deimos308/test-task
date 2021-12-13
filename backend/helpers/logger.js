const winston = require('winston');
const config = require('./../configs');

const { prodEnv } = config;

const level = prodEnv ? 'info' : 'debug';

const {
  format: { combine, prettyPrint, printf, timestamp, colorize, label },
} = winston;

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'grey',
});

const labels = {
  error: '[ERR]',
  warn: '[WRN]',
  info: '[INF]',
  debug: '[DBG]',
};

module.exports = new (class Logger {
  constructor() {
    const transports = [
      new winston.transports.Console({
        level, // extract deepest lvl
      }),
    ];

    if (prodEnv)
      transports.push(
        new winston.transports.File({
          filename: `logs/default-${config.NODE_ENV}.log`,
          level, // extract deepest lvl
          handleExceptions: true,
          maxsize: 5242880, // 5MB
          maxFiles: 3,
        })
      );

    this._logger = winston.createLogger({
      format: combine(
        combine(prettyPrint(), timestamp({ format: 'HH:mm:ss' })),
        printf(({ timestamp, message, level, stack }) => {
          return `[${timestamp}] ${labels[level]} | ${message}${
            stack ? `,\n >>> Stack: ${stack}` : ''
          }`;
        }),
        colorize({
          all: true,
        })
      ),
      transports,
    });
  }

  debug(...opts) {
    return this._logger.debug(...opts);
  }

  info(...opts) {
    return this._logger.info(...opts);
  }

  warn(...opts) {
    return this._logger.warn(...opts);
  }

  error(err, ...opts) {
    const _err = { message: err.message, stack: err.stack };
    return this._logger.error(_err, ...opts);
  }
})();
