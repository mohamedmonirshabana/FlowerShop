const express = require('express');
const mongoose = require('mongoose');
const { random } = require('make-random');
const { otpSchema, otpModel } = require('../schema/otp.schema');


const app = express();
const router = express.router();

router.get('/signin',(req, res, next) =>{
    
});

export class OTPService{
    constructor(){
        const _otpModel =  otpModel; 
    }

     Search_for_phone(phoneNumber){
        return this._otpModel.findOne({phone: phoneNumber});
    }

    generate_veryfy_code(phoneNumber){
        let ri =  random(9999);
        this._otpModel.create({phone: phoneNumber, veryfyCode: ri});
    }

    veryfy_phone_Number(phoneNumber, veryfy){
        return this._otpModel.findOne({phone: phoneNumber, veryfyCode:veryfy});
    }
}