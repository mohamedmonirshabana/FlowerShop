const flowerModel = require('../Schema/Flower.Schema');

module.exports = {
    createPhoto: async (name , flowerPath, price, description) =>{
        await flowerModel.create({
            flowername: name,
            flowerphoto: flowerPath,
            price: price,
            description: description
        });
    }
};