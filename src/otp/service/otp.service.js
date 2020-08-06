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
        await otpModel.create({phone: phoneNumber, veryfycode: ran[0]});
    },
    verifyed_Phone: async (phoneNumber, verifyedNum) =>{
        const phone = await otpModel.findOne({phone: phoneNumber, veryfycode: verifyedNum});
        await otpModel.findByIdAndUpdate({_id: phone._id}, {veryfy: true});
    },
    update_Phone: async (phoneNumber) =>{
        const phone = await otpModel.findOne({phone: phoneNumber});
        let ri = new RandomInteger();
        const ran = ri.create(1111,9999,1);
        await otpModel.findByIdAndUpdate({_id: phone._id}, {veryfycode:ran[0], veryfy: false});
    }
};