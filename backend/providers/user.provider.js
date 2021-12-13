const { Provider } = require('./super');
const { USER } = require('../constants/models');
const { Document } = require('mongoose');

class UserProvider extends Provider {
  constructor() {
    super(USER);
  }

  /**
   * Get document by primary key
   * @param {String} id - ObjectId string
   * @returns {import('../models/user.schema').UserDocument}
   */
  async getById(id) {
    return this.model.findById(id);
  }

  /**
   * Get document(s) by filter
   * @param {object} [params] - query params
   * @param {string[]} [params.fields] - select attributes
   * @param {number} [params.limit] - select limit
   * @returns {import('../models/user.schema').UserDocument| import('../models/user.schema').UserDocument[]}
   */
  async find(filter = {}, fields = null, options = {}) {
    return this.model.find(filter, fields, options);
  }

  /**
   * Create new user document
   * @param {Document | String} target - user document or ObjectId string
   * @param {Object} dto - user data
   * @returns {Promise<import('../models/user.schema').UserDocument>}
   */
  async update(target, dto) {
    try {
      const document = target instanceof Document ? target : await this.getById(target);

      for (const [key, value] of Object.entries(dto)) {
        document[key] = value;
      }

      await document.save();

      return document.toObject();
    } catch (error) {
      throw this.mapError(error);
    }
  }

  /**
   * Update user document, attach event
   * @param {String} userId - user ObjectId string
   * @param {String} eventId - event ObjectId string
   * @returns {Promise<Boolean>}
   */
  async attachEvent(userId, eventId) {
    try {
      await this.model.updateOne({ _id: userId }, { $addToSet: { events: eventId } });
      return true;
    } catch (error) {
      throw this.mapError(error);
    }
  }

  /**
   * Update user document, detach event
   * @param {String} userId - user ObjectId string
   * @param {String} eventId - event ObjectId string
   * @returns {Promise<Boolean>}
   */
  async detachEvent(userId, eventId) {
    try {
      await this.model.updateOne({ _id: userId }, { $pull: { events: eventId } });
      return true;
    } catch (error) {
      throw this.mapError(error);
    }
  }

  /**
   * Create new user document
   * @param {Object} dto - user data
   * @param {Object} [options] - query options
   * @param {Boolean} [options.raw] - return raw object
   * @returns {Promise<import('../models/user.schema').UserDocument>}
   */
  async create(dto, options = {}) {
    const { raw = true } = options;

    try {
      const user = await this.model.create(dto);
      return raw ? user.toObject() : user;
    } catch (error) {
      throw this.mapError(error);
    }
  }

  /**
   * Delete existing document
   * @param {String} id - ObjectId string
   * @returns {Promise<Boolean>}
   */
  async delete(_id) {
    try {
      const { deletedCount } = await this.model.deleteOne({ _id }, { single: true }, null);
      return !!deletedCount;
    } catch (error) {
      throw this.mapError(error);
    }
  }
}

module.exports = new UserProvider();
