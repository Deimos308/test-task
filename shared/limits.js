/**
 * @description limits object generator
 * @param {Number} MIN - minimum limit
 * @param {Number} MAX - maximum limit
 * @returns {Limits} object which contains limits
 */
const limit = (MIN, MAX) => ({ MAX, MIN });

module.exports = Object.freeze({
  USER: {
    FIRST_NAME: limit(1, 64),
    LAST_NAME: limit(1, 64),
    EMAIL: limit(3, 64),
    PHONE_NUMBER: limit(3, 32),
  },
  EVENT: {
    TITLE: limit(4, 64),
    DESCRIPTION: limit(16, 128),
  },
});
