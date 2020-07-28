const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {CLIENT_MODEL_NAME} = require('../../../common/constants'); 
const { schema } = require("../../otp/schema/otp.schema");

const clientSchema = new Schema({
    notification:{type:Boolean, required: true},
    clientID: {type: String, required: true}

});

const clientModel = mongoose.model("CLIENT_MODEL_NAME", clientSchema);

module.exports = clientModel;