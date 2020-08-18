const Joi = require('joi');

module.exports = {
    validateOrder: (order) =>{
        const schema = {
            providerID: Joi.string().min(5).required(),
            itemes: Joi.array().required()
        };
        return Joi.validate(order, schema);
    },
    
};