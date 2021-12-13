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
  title: Joi.string().min(TITLE.MIN).max(TITLE.MAX),
  description: Joi.string().min(DESCRIPTION.MIN).max(DESCRIPTION.MAX),
  startDate: Joi.date().less(Joi.ref('endDate')),
  endDate: Joi.date().greater('now'),
  user: Joi.objectId(),
}).min(Joi.ref('$min_keys', { render: true }));

module.exports.updateEventScheme = Event;
