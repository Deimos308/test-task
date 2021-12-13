require('dotenv').config;
const mongoose = require('mongoose');

// init models
require('../models');

const { MONGO_DB_URI } = process.env;

class MongoDBAdapter {
  constructor() {
    this.connection = null;
    this._ = mongoose;
  }

  async setup(logger = console) {
    if (!this.connection) {
      // connect
      await mongoose.connect(MONGO_DB_URI);
      this.connection = mongoose.connection;

      if (this.connection.readyState)
        logger.info(`Successfully connected to MongoDB -> "${this.connection.name}"`);

      //Bind connection to error event (to get notification of connection errors)
      this.connection.on('error', logger.error.bind(logger, 'MongoDB connection error:'));
    }

    return this;
  }
}

module.exports = new MongoDBAdapter();
