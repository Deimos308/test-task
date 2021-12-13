const config = require('./../configs');

const { HttpException, STATUS_MESSAGES } = require('../helpers/errors');
const logger = require('../helpers/logger');
const envs = require('../constants/envs');
const { prodEnv } = require('./../configs');
const { CODE_STATUS } = require('../helpers/errors/constants');

module.exports = {
  /**
   * Base middleware, used as first middleware on chain
   * @type {import('express').RequestHandler} Middleware
   */
  APIMiddleware: (req, res, next) => {
    // Build request context ===================================================
    req.context = {
      pagination: null,
    };

    // Build response context ==================================================
    res.context = {
      prodEnv: config.prodEnv,
    };

    // Set common headers ======================================================
    if (process.env.NODE_ENV === envs.PRODUCTION) {
      res.setHeader('Last-Modified', new Date().toUTCString());
      res.setHeader('Cache-Control', 'private');
    }

    return next();
  },

  /**
   * Last middleware in chain
   * @type {import('express').RequestHandler} Middleware
   */
  notFound: (req, res) => {
    if (req.is === 'application/json') {
      throw HttpException.NOT_FOUND();
    }

    return res.status(410).send();
  },

  /**
   * Error handling middleware, used as last middleware on chain
   * @type {import('express').ErrorRequestHandler} ErrorHandler
   */
  errorHandler: async (err, req, res, _next) => {
    const { stack, statusCode = 500, message, debug, expose = true } = err;
    logger.error(err);

    // set data for front-end:
    const data = { message: prodEnv ? CODE_STATUS[statusCode] : message };

    // attach debug info for development mode
    if (process.env.NODE_ENV === envs.DEVELOPMENT) {
      data.debug = debug || stack;
    }

    if (err instanceof HttpException) {
      // server-side error details must be hidden from receiver if flag disabled
      // if (statusCode >= 500 && !expose) {
      //   return res.status(500).send();
      // }
    }

    // eslint-disable-next-line no-bitwise
    if (~req.path.indexOf('/api/')) {
      return res.status(statusCode).json(data);
    }

    return res.status(statusCode).send();
  },
};
