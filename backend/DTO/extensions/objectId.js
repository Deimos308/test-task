const { ObjectId } = require('mongoose').Types;

/**
 * @description core scheme
 * @typedef {import('joi').StringSchema} StringSchema
 */

/**
 * @description extension
 * @typedef {Object} ObjectIdExtension
 * @property {function(): StringSchema} phone
 */

/**
 * Joi extension. Validate if value matches the objectId format
 * Can be used with Joi.string().objectId()
 * @type {import('joi').ExtensionFactory}
 * @returns {import('joi').Extension}
 */
const objectIdExtension = (joi) => ({
  type: 'objectId',
  base: joi.string(),
  messages: {
    invalid: '{{#label}} must be a valid objectId string',
  },
  validate(value, helpers) {
    if (!ObjectId.isValid(value)) {
      return { errors: helpers.error('invalid') };
    }
  },
});

/**
 * @param {import('joi')} Joi - join root instance
 * @returns {import('joi') & ObjectIdExtension}
 */
module.exports = (Joi) => Joi.extend(objectIdExtension);
