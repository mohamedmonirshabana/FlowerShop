const Joi = require('joi');
const { schema } = require('../schema/user.schema');

module.exports = {
    validate : (user) => {
        const schema = {
            username: Joi.string().min(5).required(),
            email: Joi.string().min(10).required().email(),
            phone: Joi.number().min(5).required(),
            password: Joi.string().min(8).required(),
            profilepics: Joi.string()
        };
        return Joi.validate(user, schema);
    },
    validateUpdate: (user) =>{
        const Schema = {
            name: Joi.string().min(5),
            email: Joi.string().min(10).email(),
            profilepics: Joi.string()
        };
        return Joi.validate(user, schema);
    }
};