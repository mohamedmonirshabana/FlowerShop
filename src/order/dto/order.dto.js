const Joi = require('joi');

module.exports = {
    validateOrder: (order) =>{
        const schema = {
            client: Joi.string().min(5).required(),
            provider: Joi.string().min(5).required(),
            status: Joi.string().required(),
            createAt: Joi.date().required(),
            updateAt: Joi.date().required(),
            itemes: Joi.array().required()
        };
        return Joi.validate(user, schema);
    }
};