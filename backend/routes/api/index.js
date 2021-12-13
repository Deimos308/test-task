const express = require('express');

const { eventRouter } = require('./event.router');
const { userRouter } = require('./user.router');

const Router = express.Router();

Router.use('/event', eventRouter);
Router.use('/user', userRouter);

module.exports.apiRouter = Router;
