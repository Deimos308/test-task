const MongoDB = require('../adapters/mongodb');

class Provider {
  /**
   * @param {String} modelName
   */
  constructor(modelName) {
    this._ = MongoDB._;
    /**
     * @type {import('mongoose').Model}
     */
    this.model = this._.model(modelName);
    this.modelName = modelName;
  }

  /**
   * Function returns true if at least one document exists in the database
   * that matches the given filter, and false otherwise.
   * @param {Object} filter - filter object
   * @returns {Promise<boolean>}
   */
  async _exists(filter) {
    return this.model.exists(filter);
  }

  /**
   * Map db errors into client compatible
   * @param {Error|MongoError} error - original error
   * @returns {Error} Mapped error
   */
  mapError(error) {
    const message = (({ code, keyPattern }) =>
      ({
        11000: `${this.modelName} with the same "${Object.keys(keyPattern)[0]}" already exists!`,
      }[code] || `${this.modelName} processing returns error...`))(error);
    const mappedError = new Error(message);

    mappedError.debug = {
      original: error.message,
    };

    return mappedError;
  }
}

module.exports = { Provider };

// =============================================================================
// Type definitions
// =============================================================================

/**
 * @typedef {Object} Pagination
 * @property {number} offset
 * @property {number} limit
 * @property {number} page
 */

/**
 * @typedef {Object} Sort
 * @property {string} field
 * @property {'ASC'|'DESC'} type
 */
