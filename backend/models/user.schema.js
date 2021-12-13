const mongoose = require('mongoose');
const { USER, EVENT } = require('../constants/models');
const { USER: LIMITS } = require('../constants/limits');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: LIMITS.FIRST_NAME.MAX,
      minlength: LIMITS.FIRST_NAME.MIN,
    },
    lastName: {
      type: String,
      maxlength: LIMITS.LAST_NAME.MAX,
      minlength: LIMITS.LAST_NAME.MIN,
    },
    email: {
      type: String,
      required: true,
      maxlength: LIMITS.EMAIL.MAX,
      minlength: LIMITS.EMAIL.MIN,

      unique: true, // `email` must be unique
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: LIMITS.PHONE_NUMBER.MAX,
      minlength: LIMITS.PHONE_NUMBER.MIN,

      unique: true, // `phoneNumber` must be unique
    },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: EVENT }],
  },
  { timestamps: true }
);

module.exports = mongoose.model(USER, UserSchema);

// =============================================================================
// Type defs
// =============================================================================
/**
 *  @typedef UserDocument
 *  @property {String} firstName
 *  @property {String} [lastName]
 *  @property {String} email
 *  @property {String} phoneNumber
 *  @property {import('mongoose').Schema.Types.ObjectId[]} [events=[]]
 */
