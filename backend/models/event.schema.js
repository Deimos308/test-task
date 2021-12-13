const mongoose = require('mongoose');

const { EVENT, USER } = require('../constants/models');
const { EVENT: LIMITS } = require('../constants/limits');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: LIMITS.TITLE.MAX,
      minlength: LIMITS.TITLE.MIN,
    },
    description: {
      type: String,
      required: true,
      maxlength: LIMITS.DESCRIPTION.MAX,
      minlength: LIMITS.DESCRIPTION.MIN,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: USER },
  },
  { timestamps: true }
);

EventSchema.post('save', { document: true, query: false }, async (document) => {
  try {
    await mongoose
      .model(USER)
      .updateOne({ _id: document.user }, { $addToSet: { events: document._id } });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model(EVENT, EventSchema);
// =============================================================================
// Type defs
// =============================================================================
/**
 *  @typedef EventDocument
 *  @property {String} title
 *  @property {String} description
 *  @property {Date} endDate
 *  @property {Date} startDate
 *  @property {import('mongoose').Schema.Types.ObjectId} user
 */
