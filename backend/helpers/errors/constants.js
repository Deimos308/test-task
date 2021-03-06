const HTTP_STATUS = Object.freeze({
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  NOT_ACCEPTABLE: 'NOT_ACCEPTABLE',
  REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
  CONFLICT: 'CONFLICT',
  GONE: 'GONE',
  PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
  URI_TOO_LONG: 'URI_TOO_LONG',
  UNSUPPORTED_MEDIA_TYPE: 'UNSUPPORTED_MEDIA_TYPE',
  IM_A_TEAPOT: 'IM_A_TEAPOT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  LOCKED: 'LOCKED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
  BAD_GATEWAY: 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',
});

const CODE_STATUS = Object.freeze({
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  402: 'PAYMENT_REQUIRED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  405: 'METHOD_NOT_ALLOWED',
  406: 'NOT_ACCEPTABLE',
  408: 'REQUEST_TIMEOUT',
  409: 'CONFLICT',
  410: 'GONE',
  413: 'PAYLOAD_TOO_LARGE',
  414: 'URI_TOO_LONG',
  415: 'UNSUPPORTED_MEDIA_TYPE',
  418: 'IM_A_TEAPOT',
  422: 'UNPROCESSABLE_ENTITY',
  423: 'LOCKED',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_SERVER_ERROR',
  501: 'NOT_IMPLEMENTED',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
});

const STATUS_CODES = Object.freeze({
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  IM_A_TEAPOT: 418,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
});

const STATUS_MESSAGES = Object.freeze({
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  PAYMENT_REQUIRED: 'Payment Required',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  METHOD_NOT_ALLOWED: 'Method Not Allowed',
  NOT_ACCEPTABLE: 'Not Acceptable',
  REQUEST_TIMEOUT: 'Request Timeout',
  CONFLICT: 'Conflict',
  GONE: 'Gone',
  PAYLOAD_TOO_LARGE: 'Payload to large',
  URI_TOO_LONG: 'URI Too Long',
  UNSUPPORTED_MEDIA_TYPE: 'Unsupported Media Type',
  IM_A_TEAPOT: 'I`m a Teapot',
  UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
  LOCKED: 'Locked',
  TOO_MANY_REQUESTS: 'Too Many Requests',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_IMPLEMENTED: 'Not Implemented',
  BAD_GATEWAY: 'Bad Gateway',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  GATEWAY_TIMEOUT: 'Gateway Timeout',
});

module.exports = {
  HTTP_STATUS,
  CODE_STATUS,
  STATUS_CODES,
  STATUS_MESSAGES,
};
