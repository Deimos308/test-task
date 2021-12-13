const router = require('express').Router();

const { apiRouter } = require('./api');
const { appRouter } = require('./app');

const {
  common: { notFound, errorHandler, APIMiddleware },
} = require('./../middleware');

module.exports = (app) => {
  router.use('/api', APIMiddleware, apiRouter);
  router.use('/app', appRouter);

  // redirect from root to app
  router.get('/', (_req, res, _next) => res.status(301).redirect('/app/'));

  router.use(notFound, errorHandler);
  app.use(router);
};
