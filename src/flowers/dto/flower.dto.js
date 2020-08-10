const Joi= require('joi');

module.exports = {
    validFlower: (user) =>{
        const schema = {
            flowerName: Joi.string().min(5).required(),
            photo: Joi.string().min(5),
            price: Joi.number().required(),
            desc: Joi.string().min(5).max(255).required()
        };

        return Joi.validate(user, schema);
    }
};