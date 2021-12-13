/* eslint-disable no-bitwise */
const __path = require('path');
const logger = require('morgan');
const express = require('express');
const compression = require('compression');
const serveStatic = require('serve-static');

const config = require('./configs');
const router = require('./routes');

const envs = require('./constants/envs');

/**
 * Configure Express application
 * @param {import('express').Express} app - application instance
 * @returns {import('express').Express}
 */
module.exports = (app) => {
  app.disable('x-powered-by');
  app.disable('etag');

  app.use(compression());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  // ===========================================================================
  // Assets & common static
  // ===========================================================================
  // Backend assets static content
  app.get('/assets/*.(png|webp|jp(e)?g)$', serveStatic(config.paths.assetsDir, { maxAge: '1y' }));
  app.get('/dist/*', serveStatic(config.paths.vueDistDir, { maxAge: '1y' }));

  // ===========================================================================
  // Logging setup
  // ===========================================================================

  if (!+process.env.DISABLE_LOGS) {
    app.use(logger('dev'));
  }

  // ===========================================================================
  // Setup routing
  // ===========================================================================
  router(app);

  return app;
};
