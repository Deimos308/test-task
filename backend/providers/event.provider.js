const { Provider } = require('./super');
const { EVENT } = require('../constants/models');
const { Document } = require('mongoose');

class EventProvider extends Provider {
  constructor() {
    super(EVENT);
  }

  /**
   * Get instance by primary key
   * @param {String} id - ObjectId string
   * @returns {import('../models/event.schema').EventDocument}
   */
  async getById(id) {
    return this.model.findById(id);
  }

  /**
   * Get instances by parent id
   * @param {String} id - ObjectId string
   * @returns {import('../models/event.schema').EventDocument}
   */
  async getByParentId(id) {
    return this.model.find({ user: id });
  }

  /**
   * Get instance(s) by column
   * @param {object} [params] - query params
   * @param {string[]} [params.fields] - select attributes
   * @param {number} [params.limit] - select limit
   * @returns {import('../models/event.schema').EventDocument| import('../models/event.schema').EventDocument[]}
   */
  async find(filter = {}, fields = null, options = {}) {
    if (filter.id) {
      // remap id key if misspelled
      filter._id = filter.id;
      delete filter.id;
    }

    return this.model.find(filter, fields, options);
  }

  /**
   * Create new event document
   * @param {Document | String} target - user document or ObjectId string
   * @param {Object} dto - event data
   * @returns {Promise<import('../models/event.schema').EventDocument>}
   */
  async update(target, dto, options = {}) {
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
   * Create new event document
   * @param {Object} dto - event data
   * @param {Object} [options] - query options
   * @param {Boolean} [options.raw] - return raw object
   * @returns {Promise<import('../models/event.schema').EventDocument>}
   */
  async create(dto, options = {}) {
    const { raw = true } = options;

    try {
      const event = await this.model.create(dto);
      return raw ? event.toObject() : event;
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
module.exports = new EventProvider();
