const MODELS = require('../constants/models');

module.exports = {
  [MODELS.EVENT]: require('./event.schema'),
  [MODELS.USER]: require('./user.schema'),
};
