const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models = require('../../../common/constants');
const autoIncrement = require('mongoose-auto-increment');


const flowerSchema = new Schema({
    flowername: {type: String, required: true},
    flowerphoto: {type: String, required:true},
    price:{type:Number, required:true},
    description:{type:String, required:false}
});
autoIncrement.initialize(mongoose.connection);

flowerSchema.plugin(autoIncrement.plugin,{
    model: Models.FLOWER_MODEL_NAME,
    field:'_id',
    startAt:1,
    incrementBy:1
});


const flowerModel = mongoose.model( Models.FLOWER_MODEL_NAME,flowerSchema);

module.exports= flowerModel;

