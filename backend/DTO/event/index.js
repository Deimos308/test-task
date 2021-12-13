/* eslint-disable global-require */
module.exports = {
  createScheme: require('./event.create.dto').createEventScheme,
  updateScheme: require('./event.update.dto').updateEventScheme,
};
