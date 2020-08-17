const Joi = require('joi');

module.exports ={
    otpvalidate : (otp) =>{
        const schema = {
            phone: Joi.string().min(6).max(20).required()
        };
        return Joi.validate(otp, schema);
    },
    veryfyvalid: (otp) =>{
        const schema = {
            phone: Joi.string().min(6).max(20).required(),
            verify: Joi.string().max(4).required()
        };
        return Joi.validate(otp, schema);
    }
};