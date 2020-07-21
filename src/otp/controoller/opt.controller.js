const express = require('express');
const bodyparse = require('body-parser');
const { OTPService } = require('../service/otp.service');

const otpService = new OTPService();
const app = express();
const rout = express.Router();



app.use(bodyparse.urlencoded());



 rout.get('/veryfycode', (req, res, next) =>{
    const userPhone = req.body('phone');
    otpService.Search_for_phone(userPhone);
    otpService.generate_veryfy_code(userPhone);
});


module.exports = rout;
