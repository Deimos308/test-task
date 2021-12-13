const { Service } = require('./super');
const { HttpException } = require('../helpers/errors');

const { EventService } = require('./event.service');
const userProvider = require('../providers/user.provider');

const { createScheme, updateScheme } = require('../DTO/user');
const { DTO_ACTIONS } = require('../constants/services');

class UserService extends Service {
  /**
   * Get paginated & filtered documents list
   * @param {import('./../providers/super').Pagination} pagination
   * @param {string} [term]
   * @returns {Promise<Object[]>}
   */
  static async getUsersList(pagination, term = '') {
    return userProvider.find();
  }

  /**
   * Get document by id
   * @param {import('mongoose').ObjectId} id - document identifier
   * @returns {Promise<Object>}
   */
  static async getUserById(id) {
    return userProvider.getById(id);
  }

  /**
   * Get document with dependents by id
   * @param {import('mongoose').ObjectId} id - document identifier
   * @returns {Promise<Object>}
   */
  static async getUserEvents(id) {
    return EventService.getEventsByUserId(id);
  }

  // ===========================================================================
  // Entity CRUD
  // ===========================================================================
  /**
   * @requires
   * Create new "user" document
   * @param {UserDTO} userDTO
   * @returns {Promise<any>}
   */
  static async createUser(userDTO) {
    try {
      return await userProvider.create(userDTO);
    } catch (error) {
      throw HttpException.BAD_REQUEST(error.message, { debug: error.debug });
    }
  }

  /**
   * Update existing "user" document
   * @param {import('mongoose').Types.ObjectId} id - document identifier
   * @param {UserDTO} userDTO
   * @returns {Promise<any>}
   */
  static async updateUser(id, userDTO) {
    const existingRecord = await userProvider.getById(id);

    if (!existingRecord) {
      throw HttpException.NOT_FOUND();
    }

    try {
      return await userProvider.update(existingRecord, userDTO);
    } catch (error) {
      throw HttpException.BAD_REQUEST(error.message, { debug: error.debug });
    }
  }

  /**
   * Delete existing "user" document
   * @param {number} id - document identifier
   * @returns {Promise<boolean>}
   */
  static async deleteUser(id) {
    if (await userProvider._exists({ id })) {
      try {
        return await userProvider.delete(id);
      } catch (error) {
        throw HttpException.BAD_REQUEST(error.message, { debug: error.debug });
      }
    }
    throw HttpException.NOT_FOUND();
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
    return Service.validateDTO(dto, schema, { ...options, strict });
  }
}

const ACTIONS = {
  [DTO_ACTIONS.CREATE]: { schema: createScheme, strict: true },
  [DTO_ACTIONS.UPDATE]: { schema: updateScheme, strict: false },
};

module.exports.UserService = UserService;

// =============================================================================
// Type definitions
// =============================================================================

/**
 * @typedef {Object} UserDTO
 * @property {string} firstName
 * @property {string} [lastName]
 * @property {string} email
 * @property {string} [phoneNumber]
 */
