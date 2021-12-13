const _Joi = require('joi');

const {
  EVENT: { TITLE, DESCRIPTION },
} = require('../../constants/limits');

// =============================================================================
// Extensions injections
// =============================================================================
const Joi = require('../extensions/objectId')(_Joi);
// =============================================================================

const Event = Joi.object({
  title: Joi.string().min(TITLE.MIN).max(TITLE.MAX).required(),
  description: Joi.string().min(DESCRIPTION.MIN).max(DESCRIPTION.MAX).required(),
  startDate: Joi.date().iso().raw().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).raw().required(),
  user: Joi.objectId(),
});

module.exports.createEventScheme = Event;
