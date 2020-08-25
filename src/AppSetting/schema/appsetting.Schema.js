const mongoose = require('mongoose');
const Models = require('../../../common/constants');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const appSettingSchema = new Schema({
    minDistanceInKM: {type: Number, default:5}
});

autoIncrement.initialize(mongoose.connection);

appSettingSchema.plugin(autoIncrement.plugin, {
    model:'APPSETTING_MODEL_NAME',
    field:'_id',
    startAt:1,
    incrementBy:1
});

const appSettingModel = mongoose.model( Models.APPSETTING_MODEL_NAME, appSettingSchema);

module.exports = appSettingModel;