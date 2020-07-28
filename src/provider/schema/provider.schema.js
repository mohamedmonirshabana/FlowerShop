const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {PROVIDER_MODEL_NAME} = require('../../../common/constants');

const providerSchema = new Schema({
    userID:{type: String, required: true},
    verifyed: {type:Boolean, required: true, default:false},
    logoID:{type: String, required:true},
    IDImages:{type: [String], required:false}
});

const providerModel = mongoose.model("PROVIDER_MODEL_NAME",providerSchema);

module.exports = providerModel;