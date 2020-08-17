const express = require('express');
let RandomInteger = require('random-multiple-integers');
const otpModel= require("../schema/otp.schema");
const otpRout = express.Router();
const { Search_for_phone, create_Phone,  verifyed_Phone, update_Phone, update_Verifystatus } = require('../service/otp.service');
const { otpvalidate, veryfyvalid } = require('../dto/otp.dto');

 otpRout.post('/send', async (req, res) =>{
     console.log("number is Send");
    const {error} = otpvalidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const Test_phone_exist =  await Search_for_phone(req.body.phone);
    if(Test_phone_exist){
        res.status(400).send();
    }else{
        create_Phone(req.body.phone);
        res.status(200).send();
    }
    
});

otpRout.post('/verifyed', async (req, res, next) =>{
    const {error} = veryfyvalid(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const phoneNum = req.body.phone;
    const verify = req.body.verify;

    const verifyPhone = await verifyed_Phone(phoneNum, verify);
    if(verifyPhone){
        await update_Verifystatus(phoneNum);
        res.status(200).send();
    }else{
        res.status(400).send();
    }
});

module.exports = otpRout;
