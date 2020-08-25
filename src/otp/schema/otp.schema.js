const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models = require('../../../common/constants');
const autoIncrement = require('mongoose-auto-increment');

const otpSchema = new Schema({
  phone: { type: String, required: true },
  verifycode: { type: Number, required: true },
  verify: { type: Boolean, required: true, default: false }
});


autoIncrement.initialize(mongoose.connection);



otpSchema.plugin(autoIncrement.plugin, {
  model: Models.OTP_MODEL_NAME,
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

const otpModel = mongoose.model(Models.OTP_MODEL_NAME, otpSchema);
module.exports = otpModel;
