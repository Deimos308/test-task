const chalk = require('chalk');
const express = require('express');
const cluster = require('cluster');
const { createServer } = require('http');

require('express-async-errors');
const setupExpressApp = require('./express-app');

const mongoDBAdapter = require('./adapters/mongodb');
const logger = require('./helpers/logger');

const configs = require('./configs');
const envs = require('./constants/envs');
const { port, host, NODE_ENV: env } = configs;

module.exports = async () => {
  /**
   * Handle cluster "onExit" callback
   * @param {Object} worker
   * @param {Number} code
   * @param {String} signal
   */
  const clusterOnExit = async (worker, code, signal) => {
    logger.warn(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}\nStarting a new worker...`
    );

    // close db connection

    cluster.fork();
  };

  if (cluster.isMaster) {
    if (!process.env.IS_PM2) {
      // for development startup
      const numWorkers = configs.defaultClustersAmount
        ? configs.defaultClustersAmount
        : require('os').cpus().length / 2;

      const mode = chalk.black[env === envs.PRODUCTION ? 'bgRed' : 'bgGreen']` ${env} `;
      logger.info(`Server was starting in ${mode} mode on port: ${chalk.magenta(port)}`);
      logger.debug(chalk.gray(`Master cluster setting up ${numWorkers} workers...`));

      // eslint-disable-next-line no-const-assign
      for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
      }

      cluster
        .on('online', (worker) => {
          logger.debug(chalk.gray(`Worker ${worker.process.pid} is online`));
        })
        .on('disconnect', clusterOnExit)
        .on('exit', clusterOnExit)
        .on('SIGINT', clusterOnExit);
    }
  } else if (cluster.isWorker) {
    // check connection before initialization
    await mongoDBAdapter.setup(logger);

    const app = setupExpressApp(express());
    const server = createServer(app);

    // Append event handlers =================================================
    server.on('error', async (error) => {
      if (error.syscall !== 'listen') {
        logger.error({ error });
        throw error;
      }

      await models.sequelize.close();

      switch (error.code) {
        case 'EACCES':
          logger.error({ error: new Error(`Port ${port} requires elevated privileges`) });
          process.exit(1);

        case 'EADDRINUSE':
          logger.error({ error: new Error(`Port ${port} is already in use`) });
          process.exit(1);

        default:
          logger.error({ error });
          throw error;
      }
    });

    // on interruption
    server.on('SIGINT', () => {
      logger.info(chalk`Process was interrupted by {bold SIGINT} signal.`);
    });

    // on termination
    server.on('SIGTERM', () => {
      logger.info(chalk`Process was terminated by {bold SIGTERM} signal.`);
    });

    server.on('listening', () => {
      if (env === envs.DEVELOPMENT) {
        const { port: _port } = server.address();

        const link = chalk.underline[
          env === envs.PRODUCTION ? 'red' : 'green'
        ]`http://${host}:${port}/`;

        logger.info(`Application available on: ${link}`);
      }
    });

    // Listen on port, server initialized ===================================
    server.listen(port, host);
  }
};
