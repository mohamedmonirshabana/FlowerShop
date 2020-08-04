const mongoose = require('mongoose');
const {APPSETTING_MODEL_NAME} = require('../../../common/constants');
const Schema = mongoose.Schema;

const appSettingSchema = new Schema({
    minDistination: {type: Number, default:1000},
    maxDistination: {type: Number, default:5000}
});

const appSettingModel = mongoose.model("APPSETTING_MODEL_NAME", appSettingSchema);

module.exports = appSettingModel;