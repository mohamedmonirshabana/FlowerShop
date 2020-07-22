const express = require('express');
// const { Search_for_phone_t } = require('../service/otp.service');
// const random  = require('make-random');
// let RandomInteger = require('random-multiple-integers');
let RandomInteger = require('random-multiple-integers');

const otpModel= require("../schema/otp.schema");

const otpRout = express.Router();

async function Search_for_phone(phoneNumber){
    return otpModel.findOne({phone: phoneNumber});
}

async function Create_Phone(phoneNumber){
    let ri = new RandomInteger();
    const ran = ri.create(1111,9999,1);
    await otpModel.create({phone: phoneNumber,veryfycode: ran[0]});
}

async function Update_Phone(phoneNumber){
    const phone = await otpModel.findOne({phone: phoneNumber});
    let ri = new RandomInteger();
    const ran = ri.create(1111,9999,1);
    await otpModel.findByIdAndUpdate({_id: phone._id},{veryfycode:ran[0], veryfy: false});
}
async function VeryFyed_phone(phoneNumber, veryfynum){
    const phone = await otpModel.findOne({phone: phoneNumber, veryfycode: veryfynum});
    console.log(phone);
    await otpModel.findByIdAndUpdate({_id: phone._id},{veryfy: true});
    
}

// async function generate_veryfy_code(phoneNumber){
//     console.log("Service : "+phoneNumber);
//     // let ri = new RandomInteger();
//     // const ran = await ri.create(1111,9999,1);
//     // console.log(ran);
//     // otpModel.create({phone: phoneNumber, veryfycode: ran[0]});
//     const y = await OTPService.Search_for_phone(phoneNumber);
//     console.log(y);
//     if(OTPService.Search_for_phone(phoneNumber)){
//         console.log("Found");

//     }
    
// }

// async function veryfy_phone_Number(phoneNumber, veryfy){
//     return otpModel.findOne({phone: phoneNumber, veryfyCode:veryfy});
// }


 otpRout.post('/veryfycode', async (req, res) =>{
    const Test_phone_exist =  await Search_for_phone(req.body.phone);
    console.log(Test_phone_exist);
    if(Test_phone_exist === null){
        console.log("Create Phone");
        Create_Phone(req.body.phone);
    }else{
        console.log("UPdate");
        Update_Phone(req.body.phone);
    }
    res.send("end");
});

otpRout.post('/veryFyed', async (req, res, next) =>{
    const phoneNum = req.body.phone;
    const veryfy = req.body.veryfy;
    await VeryFyed_phone(phoneNum, veryfy);
    res.send("end");
});

otpRout.get('/mse',(req, res)=>{
    res.send("Test");
});



module.exports = otpRout;
