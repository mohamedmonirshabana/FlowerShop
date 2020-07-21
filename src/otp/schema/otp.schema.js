const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { OTP_MODEL_NAME } = require('../../../common/constants');

 const otpSchema = new Schema({
    phone: {type: Number, required: true},
    veryfycode: {type: Number, required: true}
}); 

 const otpModel = mongoose.model("OTP_MODEL_NAME", otpSchema);
module.exports = otpModel;
