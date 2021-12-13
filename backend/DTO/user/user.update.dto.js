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
  firstName: Joi.string().min(FIRST_NAME.MIN).max(FIRST_NAME.MAX),
  lastName: Joi.string().min(LAST_NAME.MIN).max(LAST_NAME.MAX),
  email: Joi.string().min(EMAIL.MIN).max(EMAIL.MAX).email(),
  phoneNumber: Joi.phone().min(PHONE_NUMBER.MIN).max(PHONE_NUMBER.MAX),
})
  .min(Joi.ref('$min_keys', { render: true }))
  .strict();

module.exports.updateUserScheme = User;
