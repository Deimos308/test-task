if (!process.env.NODE_ENV) require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const { config } = env === 'production' ? require('./production') : require('./development');

module.exports = config;
