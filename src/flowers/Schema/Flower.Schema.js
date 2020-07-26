const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { FLOWER_MODEL_NAME } = require('../../../common/constants');

const flowerSchema = new Schema({
    flowername: {type: String, required: true},
    flowerphoto: {type: String, required:true},
    price:{type:Number, required:true},
    description:{type:String, required:false}
});

const flowerModel = mongoose.model("FLOWER_MODEL_NAME",flowerSchema);

module.exports= flowerModel;
