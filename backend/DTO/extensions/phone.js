const PHONE_HANDLER = (phone) => {
  // is not defined =>
  // no additional checking needed
  if (typeof phone !== 'string') {
    return false;
  }
  // otherwise =>
  // regex match validation
  const matched =
    /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/.test(
      phone
    );

  return !!matched;
};

/**
 * @description core scheme
 * @typedef {import('joi').StringSchema} StringSchema
 */

/**
 * @description extension
 * @typedef {Object} PhoneExtension
 * @property {function(): StringSchema} phone
 */

/**
 * Joi extension. Validate if value matches the phone number format
 * Can be used with Joi.string().phone()
 * @type {import('joi').ExtensionFactory}
 * @returns {import('joi').Extension}
 */
const phoneExtension = (joi) => ({
  type: 'phone',
  base: joi.string(),
  messages: {
    invalid: '{{#label}} must be a valid phone number string',
  },
  validate(value, helpers) {
    if (!PHONE_HANDLER(value)) {
      return { errors: helpers.error('invalid') };
    }
  },
});

/**
 * @param {import('joi')} Joi - join root instance
 * @returns {import('joi') & PhoneExtension}
 */
module.exports = (Joi) => Joi.extend(phoneExtension);
