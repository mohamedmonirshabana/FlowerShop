const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { OTP_MODEL_NAME } = require('../../../common/constants');

export const otpSchema = new Schema({
    phone: {type: Number, required: true},
    veryfyCode: {type: Number, required: true}
}); 

export const otpModel = mongoose.model(OTP_MODEL_NAME, otpSchema);