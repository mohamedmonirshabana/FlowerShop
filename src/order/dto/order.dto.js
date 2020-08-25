const Joi = require('joi');

module.exports = {
    validateOrder: (order) =>{
        const schema = {
            providerID: Joi.number().required(),
            itemes: Joi.array().required()
        };
        return Joi.validate(order, schema);
    },
    
};