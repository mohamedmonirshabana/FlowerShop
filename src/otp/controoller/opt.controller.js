const express = require('express');
let RandomInteger = require('random-multiple-integers');
const otpModel= require("../schema/otp.schema");
const otpRout = express.Router();
const { Search_for_phone, create_Phone,  verifyed_Phone, update_Phone } = require('../service/otp.service');

 otpRout.post('/veryfycode', async (req, res) =>{
    const Test_phone_exist =  await Search_for_phone(req.body.phone);
    console.log(Test_phone_exist);
    if(Test_phone_exist === null){
        console.log("Create Phone");
        create_Phone(req.body.phone);
    }else{
        console.log("UPdate");
        update_Phone(req.body.phone);
    }
    res.send("end");
});

otpRout.post('/veryFyed', async (req, res, next) =>{
    const phoneNum = req.body.phone;
    const veryfy = req.body.veryfy;
    await verifyed_Phone(phoneNum, veryfy);
    res.send("end");
});

module.exports = otpRout;
