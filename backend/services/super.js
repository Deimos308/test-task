/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
const { HttpException, HTTP_STATUS } = require('../helpers/errors');

class Service {
  // ===========================================================================
  // Schema validation
  // ===========================================================================
  /**
   *
   * @throws {@link HttpException.BAD_REQUEST BAD_REQUEST}
   * @param {object} dto - data transfer object
   * @param {ValidationSchema} schema - validation schema
   * @param {object} [options] Validation options
   * @param {boolean} [options.strict=true] If `true`, all properties are required. Default: `true`
   * @param {boolean} [options.strip=false] If `true`, all not defined properties in scheme required will be deleted Default: `false`
   * @param {boolean} [options.expose=false] If `true`, send detailed message
   * @param {string} [options.status=STATUS.BAD_REQUEST] custom error status
   */
  static async validateDTO(dto, schema, options = {}) {
    const {
      strict = true,
      strip = false,
      expose = false,
      status = HTTP_STATUS.BAD_REQUEST,
    } = options;

    try {
      const validated = await schema.validateAsync(dto, {
        presence: strict ? 'required' : 'optional',
        context: { min_keys: Number(!strict) },
        stripUnknown: strip,
      });

      return validated;
    } catch (error) {
      throw HttpException[status](expose ? error.stack : error.message);
    }
  }
}

module.exports = { Service };
