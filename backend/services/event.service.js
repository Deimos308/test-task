const { Service } = require('./super');
const { HttpException } = require('../helpers/errors');

const eventProvider = require('../providers/event.provider');
const userProvider = require('../providers/user.provider');

const { createScheme, updateScheme } = require('../DTO/event');
const { DTO_ACTIONS } = require('../constants/services');

class EventService extends Service {
  /**
   * Get paginated & filtered documents list
   * @param {import('../providers/super').Pagination} pagination
   * @param {string} [term]
   * @returns {Promise<Object[]>}
   */
  static async getEventsList(pagination, term = '') {
    return eventProvider.find();
  }

  /**
   * Get document by id
   * @param {import('mongoose').ObjectId} id - document identifier
   * @returns {Promise<Object>}
   */
  static async getEventById(id) {
    return eventProvider.getById(id);
  }

  /**
   * Get documents by parent id
   * @param {import('mongoose').ObjectId} id - document identifier
   * @returns {Promise<Object>}
   */
  static async getEventsByUserId(id) {
    return eventProvider.getByParentId(id);
  }

  // ===========================================================================
  // Entity CRUD
  // ===========================================================================

  /**
   * @requires
   * Create new "event" document
   * @param {EventTO} eventDTO
   * @returns {Promise<any>}
   */
  static async createEvent(eventDTO) {
    if (await this._checkDateCollisions(eventDTO))
      throw HttpException.BAD_REQUEST(`You can’t create event for this time`);

    try {
      const event = await eventProvider.create(eventDTO);
      return event;
    } catch (error) {
      throw HttpException.BAD_REQUEST(error.message, { debug: error.debug });
    }
  }

  /**
   * Update existing "event" document
   * @param {import('mongoose').Types.ObjectId} id - document identifier
   * @param {EventDTO} eventDTO
   * @returns {Promise<any>}
   */
  static async updateEvent(id, eventDTO) {
    const existingRecord = await eventProvider.getById(id);

    if (!existingRecord) {
      throw HttpException.NOT_FOUND();
    }

    try {
      return await eventProvider.update(existingRecord, eventDTO);
    } catch (error) {
      throw HttpException.BAD_REQUEST(error.message, { debug: error.debug });
    }
  }

  /**
   * Delete existing "event" document
   * @param {number} eventId - document identifier
   * @returns {Promise<boolean>}
   */
  static async deleteEvent(eventId) {
    const event = await eventProvider.getById(eventId);

    if (event) {
      try {
        const deletedCount = await eventProvider.delete(eventId);
        await userProvider.detachEvent(event.user, event._id);

        return deletedCount;
      } catch (error) {
        throw HttpException.BAD_REQUEST(error.message, { debug: error.debug });
      }
    }
    throw HttpException.NOT_FOUND();
  }

  /**
   * Check date collision existence for DTO
   * @param {EventDTO} event
   */
  static async _checkDateCollisions({ user, startDate, endDate }) {
    return eventProvider._exists({
      user,
      $or: [
        {
          startDate: {
            $gte: startDate,
            $lte: endDate,
          },
        },
        {
          endDate: {
            $gte: endDate,
            $lte: startDate,
          },
        },
      ],
    });
  }

  // ===========================================================================
  // Schema validation
  // ===========================================================================
  /**
   *
   * @throws {@link HttpException.BAD_REQUEST BAD_REQUEST}
   * @param {object} dto - data transfer object
   * @param {'CREATE'|'UPDATE'} action - action type
   * @param {object} [options] Validation options
   * @param {boolean} [options.strip=false] If `true`, all not defined properties in scheme required will be deleted Default: `false`
   * @param {boolean} [options.expose=false] If `true`, send detailed message
   * @param {string} [options.status=STATUS.BAD_REQUEST] custom error status
   */
  static async validateDTO(dto, action, options) {
    const { schema, strict } = ACTIONS[action];
    return Service.validateDTO(dto, schema, { ...options, strict, cast: true });
  }
}

const ACTIONS = {
  [DTO_ACTIONS.CREATE]: { schema: createScheme, strict: true },
  [DTO_ACTIONS.UPDATE]: { schema: updateScheme, strict: false },
};

module.exports.EventService = EventService;

// =============================================================================
// Type definitions
// =============================================================================

/**
 * @typedef {Object} EventDTO
 *  @property {String} title
 *  @property {String} description
 *  @property {Date|String} endDate
 *  @property {Date|String} startDate
 *  @property {String} user
 */
