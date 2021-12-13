const _Joi = require('joi');

const {
  USER: { FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER },
} = require('../../constants/limits');

// =============================================================================
// Extensions injections
// =============================================================================
const Joi = require('../extensions/phone')(_Joi);
// =============================================================================

const User = Joi.object({
  firstName: Joi.string().min(FIRST_NAME.MIN).max(FIRST_NAME.MAX).required(),
  lastName: Joi.string().min(LAST_NAME.MIN).max(LAST_NAME.MAX).optional(),
  email: Joi.string().min(EMAIL.MIN).max(EMAIL.MAX).email().required(),
  phoneNumber: Joi.phone().min(PHONE_NUMBER.MIN).max(PHONE_NUMBER.MAX).required(),
}).strict();

module.exports.createUserScheme = User;
