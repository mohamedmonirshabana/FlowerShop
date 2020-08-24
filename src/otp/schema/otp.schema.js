const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { OTP_MODEL_NAME } = require('../../../common/constants');
const autoIncrement = require('mongoose-auto-increment');

 const otpSchema = new Schema({
    phone: {type: String, required: true},
    verifycode: {type: Number, required: true},
    verify: {type: Boolean, required: true, default: false}
}); 

otpSchema.plugin(autoIncrement.plugin,'OTP_MODEL_NAME');

 const otpModel = mongoose.model("OTP_MODEL_NAME", otpSchema);
module.exports = otpModel;
