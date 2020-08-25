// const { string, date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models  = require('../../../common/constants');
const autoIncrement = require('mongoose-auto-increment');

//{ ORDER_MODEL_NAME, PROVIDER_MODEL_NAME }

const orderSchema = new Schema({
    client:{type: Number, ref: Models.CLIENT_MODEL_NAME, required: true},
    provider: {type: Number, ref: Models.PROVIDER_MODEL_NAME, required: true},
    status: { type: String , enum: ['PENDING', 'DELIVERED', 'FINISHED'],required: true ,default:"PENDING"},
    items:[{type: Number, required: true, ref: Models.FLOWER_MODEL_NAME  }],
    totalPrice:{type: Number, required: true}
},{timestamps:true});

autoIncrement.initialize(mongoose.connection);

orderSchema.plugin(autoIncrement.plugin,{ 
    model:'ORDER_MODEL_NAME',
    field:'_id',
    startAt:1,
    incrementBy:1
});

const orderModel = mongoose.model(Models.ORDER_MODEL_NAME, orderSchema);
module.exports = orderModel;