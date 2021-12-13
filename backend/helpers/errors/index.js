const { HTTP_STATUS, STATUS_CODES, STATUS_MESSAGES } = require('./constants');

/**
 * @module HttpException
 */
class HttpException extends Error {
  /**
   * @description Http Error wrapper class for handling request processing exceptions
   * @param {number} statusCode - error status code
   * @param {String} status - error status
   * @param {object} [payload] - additional payload object
   * @param {function} [payload.contextFn] - static function reference used as context for creation. Using for excluding top level call in stack trace
   * @param {string} [payload.message] - more detailed error message
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @param {boolean} [payload.expose] - expose server errors for users, if false =>
   *                                     returns 'Internal server error' instead on handling
   *
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/ MSDN documentation page} for status codes list with description
   */
  constructor(statusCode = 400, status = 'ClientRequestError', payload = {}) {
    super();

    this.status = status;
    this.name = 'HttpException';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, payload.contextFn);

    const { message, debug, expose = statusCode <= 500 } = payload;
    this.message = message || status;
    this.expose = expose;
    this.debug = debug;
  }

  /**
   * Predefined type of common client error for 400 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/400 400 status code }
   */
  static BAD_REQUEST(message, payload) {
    return new this(STATUS_CODES.BAD_REQUEST, STATUS_MESSAGES.BAD_REQUEST, {
      contextFn: this.BAD_REQUEST,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 401 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/401 401 status code }
   */
  static UNAUTHORIZED(message, payload) {
    return new this(STATUS_CODES.UNAUTHORIZED, STATUS_MESSAGES.UNAUTHORIZED, {
      contextFn: this.UNAUTHORIZED,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 402 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/402 402 status code }
   */
  static PAYMENT_REQUIRED(message, payload) {
    return new this(STATUS_CODES.PAYMENT_REQUIRED, STATUS_MESSAGES.PAYMENT_REQUIRED, {
      contextFn: this.PAYMENT_REQUIRED,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 403 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/403 403 status code }
   */
  static FORBIDDEN(message, payload) {
    return new this(STATUS_CODES.FORBIDDEN, STATUS_MESSAGES.FORBIDDEN, {
      contextFn: this.FORBIDDEN,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 404 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/404 404 status code }
   */
  static NOT_FOUND(message, payload) {
    return new this(STATUS_CODES.NOT_FOUND, STATUS_MESSAGES.NOT_FOUND, {
      contextFn: this.NOT_FOUND,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 405 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/405 405 status code }
   */
  static METHOD_NOT_ALLOWED(message, payload) {
    return new this(STATUS_CODES.METHOD_NOT_ALLOWED, STATUS_MESSAGES.METHOD_NOT_ALLOWED, {
      contextFn: this.METHOD_NOT_ALLOWED,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 406 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/406 406 status code }
   */
  static NOT_ACCEPTABLE(message, payload) {
    return new this(STATUS_CODES.NOT_ACCEPTABLE, STATUS_MESSAGES.NOT_ACCEPTABLE, {
      contextFn: this.NOT_ACCEPTABLE,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 408 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/408 408 status code }
   */
  static REQUEST_TIMEOUT(message, payload) {
    return new this(STATUS_CODES.REQUEST_TIMEOUT, STATUS_MESSAGES.REQUEST_TIMEOUT, {
      contextFn: this.REQUEST_TIMEOUT,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 409 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/409 409 status code }
   */
  static CONFLICT(message, payload) {
    return new this(STATUS_CODES.CONFLICT, STATUS_MESSAGES.CONFLICT, {
      contextFn: this.CONFLICT,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 410 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/410 410 status code }
   */
  static GONE(message, payload) {
    return new this(STATUS_CODES.GONE, STATUS_MESSAGES.GONE, {
      contextFn: this.GONE,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 413 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/413 413 status code }
   */
  static PAYLOAD_TOO_LARGE(message, payload) {
    return new this(STATUS_CODES.PAYLOAD_TOO_LARGE, STATUS_MESSAGES.PAYLOAD_TOO_LARGE, {
      contextFn: this.PAYLOAD_TOO_LARGE,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 414 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @param {boolean} [payload.expose] - expose server errors for users
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/414 414 status code }
   */
  static URI_TOO_LONG(message, payload) {
    return new this(STATUS_CODES.URI_TOO_LONG, STATUS_MESSAGES.URI_TOO_LONG, {
      contextFn: this.URI_TOO_LONG,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 415 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/415 415 status code }
   */
  static UNSUPPORTED_MEDIA_TYPE(message, payload) {
    return new this(STATUS_CODES.UNSUPPORTED_MEDIA_TYPE, STATUS_MESSAGES.UNSUPPORTED_MEDIA_TYPE, {
      contextFn: this.UNSUPPORTED_MEDIA_TYPE,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of uncommon client error for 418 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/418 418 status code }
   */
  static IM_A_TEAPOT(message, payload) {
    return new this(STATUS_CODES.IM_A_TEAPOT, STATUS_MESSAGES.IM_A_TEAPOT, {
      contextFn: this.IM_A_TEAPOT,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 422 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/422 422 status code }
   */
  static UNPROCESSABLE_ENTITY(message, payload) {
    return new this(STATUS_CODES.UNPROCESSABLE_ENTITY, STATUS_MESSAGES.UNPROCESSABLE_ENTITY, {
      contextFn: this.UNPROCESSABLE_ENTITY,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 423 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/423 423 status code }
   */
  static LOCKED(message, payload) {
    return new this(STATUS_CODES.LOCKED, STATUS_MESSAGES.LOCKED, {
      contextFn: this.LOCKED,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of common client error for 429 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/429 429 status code }
   */
  static TOO_MANY_REQUESTS(message, payload) {
    return new this(STATUS_CODES.TOO_MANY_REQUESTS, STATUS_MESSAGES.TOO_MANY_REQUESTS, {
      contextFn: this.TOO_MANY_REQUESTS,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of server error for 500 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/500 500 status code }
   */
  static INTERNAL_SERVER_ERROR(message, payload) {
    return new this(STATUS_CODES.INTERNAL_SERVER_ERROR, STATUS_MESSAGES.INTERNAL_SERVER_ERROR, {
      contextFn: this.INTERNAL_SERVER_ERROR,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of server error for 501 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @param {boolean} [payload.expose] - expose server errors for users
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/501 501 status code }
   */
  static NOT_IMPLEMENTED(message, payload) {
    return new this(STATUS_CODES.NOT_IMPLEMENTED, STATUS_MESSAGES.NOT_IMPLEMENTED, {
      contextFn: this.NOT_IMPLEMENTED,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of server error for 502 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @param {boolean} [payload.expose] - expose server errors for users
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/502 502 status code }
   */
  static BAD_GATEWAY(message, payload) {
    return new this(STATUS_CODES.BAD_GATEWAY, STATUS_MESSAGES.BAD_GATEWAY, {
      contextFn: this.BAD_GATEWAY,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of server error for 503 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @param {boolean} [payload.expose] - expose server errors for users
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/503 503 status code }
   */
  static SERVICE_UNAVAILABLE(message, payload) {
    return new this(STATUS_CODES.SERVICE_UNAVAILABLE, STATUS_MESSAGES.SERVICE_UNAVAILABLE, {
      contextFn: this.SERVICE_UNAVAILABLE,
      ...payload,
      message,
    });
  }

  /**
   * Predefined type of server error for 504 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional object used for payload building
   * @param {object} [payload.debug] - additional debug info, will be excluded on handling
   * @param {boolean} [payload.expose] - expose server errors for users
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/504 504 status code }
   */
  static GATEWAY_TIMEOUT(message, payload) {
    return new this(STATUS_CODES.GATEWAY_TIMEOUT, STATUS_MESSAGES.GATEWAY_TIMEOUT, {
      contextFn: this.GATEWAY_TIMEOUT,
      ...payload,
      message,
    });
  }
}

module.exports = { HttpException, HTTP_STATUS, STATUS_CODES, STATUS_MESSAGES };
