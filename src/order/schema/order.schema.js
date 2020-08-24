const { string, date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ORDER_MODEL_NAME, PROVIDER_MODEL_NAME } = require('../../../common/constants');

const orderSchema = new Schema({
    client:{type: Schema.Types.ObjectId, ref:'client_model_names', required: true},
    provider: {type: Schema.Types.ObjectId, ref:PROVIDER_MODEL_NAME, required: true},
    status: { type: String , enum: ['PENDING', 'DELIVERED', 'FINISHED'],required: true ,default:"PENDING"},
    items:{type: [String], required: true  }
},{timestamps:true});

const orderModel = mongoose.model("ORDER_MODEL_NAME", orderSchema);

module.exports = orderModel;