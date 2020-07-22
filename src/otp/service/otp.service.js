const express = require('express');
const mongoose = require('mongoose');
let RandomInteger = require('random-multiple-integers');
const { otpSchema, otpModel } = require('../schema/otp.schema');


const app = express();
const router = express.Router();

// router.get('/signin',(req, res, next) =>{
    
// });

//  class OTPService{
    
    //  constructor(){
    //     const _otpModel =  otpModel;
    //     let ri =  new RandomInteger(); 
    //  }

    const  Search_for_phone_t = async (phoneNumber) =>{
        console.log("My test");
        // try{
        // const test =  otpModel.findOne({phone: phoneNumber});
        // }catch(error){
        // console.log(error);
        // }
    };

//   function create_veryfy_code(phoneNumber){
//         //let ri =  new RandomInteger();
//         const ran =  this.ri.create(1111,9999,1);
//         this._otpModel.create({phone: phoneNumber, veryfyCode: ran[0]});
//     }

//     function veryfy_phone_Number(phoneNumber, veryfy){
//         return this._otpModel.findOne({phone: phoneNumber, veryfyCode:veryfy});
//     }

//      function update_veryfy_code(id){
//         const ran = this.ri.create(1111,9999,1);
//         this._otpModel.findOneAndUpdate({_id: id},{veryfycode:ran[0]});
//     }
// }
// module.exports = OTPService;
module.exports = Search_for_phone_t;