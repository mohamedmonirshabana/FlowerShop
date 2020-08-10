const mongoose = require('mongoose');
const {APPSETTING_MODEL_NAME} = require('../../../common/constants');
const Schema = mongoose.Schema;

const appSettingSchema = new Schema({
    minDistanceInKM: {type: Number, default:5}
});

const appSettingModel = mongoose.model("APPSETTING_MODEL_NAME", appSettingSchema);

module.exports = appSettingModel;