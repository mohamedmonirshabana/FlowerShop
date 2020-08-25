const express = require('express');
let RandomInteger = require('random-multiple-integers');
const otpModel = require('../schema/otp.schema');

module.exports = {
    Search_for_phone: async (phoneNumber) =>{
        return await otpModel.findOne({phone: phoneNumber});
    },
    create_Phone: async (phoneNumber) =>{
        let ri = new RandomInteger();
        const ran = ri.create(1111, 9999, 1);
        const addOTP = await otpModel.create({phone: phoneNumber, verifycode: ran[0]});
        addOTP.save();
    },
    verifyed_Phone: async (phoneNumber, verifyedNum) =>{
        return  await otpModel.findOne( {$and:[{phone:phoneNumber}, {verifycode: verifyedNum}]});
        //db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
        // await otpModel.findByIdAndUpdate({_id: phone._id}, {verify: true});
    },
    update_Verifystatus: async(phoneNumber) =>{
        const phone = await otpModel.findOne({phone: phoneNumber});
        await otpModel.findByIdAndUpdate({_id: phone._id}, {verify: true});
    },
    update_Phone: async (phoneNumber) =>{
        const phone = await otpModel.findOne({phone: phoneNumber});
        let ri = new RandomInteger();
        const ran = ri.create(1111,9999,1);
        await otpModel.findByIdAndUpdate({_id: phone._id}, {verifycode:ran[0], verify: false});
    }
};