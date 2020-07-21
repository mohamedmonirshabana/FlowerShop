const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import { OTP_MODEL_NAME } from '../../../common/constants';

export const otpSchema = new Schema({
    phone: {type: Number, required: true},
    veryfyCode: {type: Number, required: true}
}); 

const otp = mongoose.model(OTP_MODEL_NAME, otpSchema);