const Joi = require('joi');

module.exports = {
    providerValidate: (provider)=>{
        const schema = {
            IDImage: Joi.string().min(5),
            logoID: Joi.binary(),
            lat: Joi.string().min(5).required(),
            lng: Joi.string().min(5).required()
        };

        return Joi.validate(provider, schema);
    }
};