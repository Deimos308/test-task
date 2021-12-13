/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { AppController } = require('../../controllers/public/app.controller');

// =============================================================================
// APP INDEX ROUTE
// =============================================================================
router.get('*', AppController.getAppIndex);

module.exports.appRouter = router;
