/* eslint-disable global-require */
module.exports = {
  createScheme: require('./user.create.dto').createUserScheme,
  updateScheme: require('./user.update.dto').updateUserScheme,
};
