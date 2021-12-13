/* eslint-disable global-require */
require('dotenv').config();
const __path = require('path');
const { mkdirSync, existsSync } = require('fs');

const logger = require('./helpers/logger');
const server = require('./server');

// do common stuff before server start
// create temp/local folders
[__path.resolve(__dirname, 'logs'), __path.resolve(__dirname, 'assets', 'images')].forEach(
  (dirPath) => {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
  }
);

// start server
server().catch((error) => logger.error(error));
