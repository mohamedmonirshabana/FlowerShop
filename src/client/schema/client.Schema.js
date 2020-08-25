const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Models = require('../../../common/constants'); 
const { schema } = require("../../otp/schema/otp.schema");
const autoIncrement = require('mongoose-auto-increment');

const clientSchema = new Schema({
    notification:{type:Boolean, required: true, default: true},
    clientID: {type: Number, ref:  Models.USER_MODEL_NAME  ,  required: true}

});
autoIncrement.initialize(mongoose.connection);

clientSchema.plugin(autoIncrement.plugin,{
    model:Models.CLIENT_MODEL_NAME,
    field:'_id',
    startAt:1,
    incrementBy:1
});

const clientModel = mongoose.model( Models.CLIENT_MODEL_NAME, clientSchema);

module.exports = clientModel;