const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models = require('../../../common/constants');
const autoIncrement = require('mongoose-auto-increment');

const adminSchema = new Schema({
    userID:{type: Number, ref:Models.USER_MODEL_NAME}
});

autoIncrement.initialize(mongoose.connection);

adminSchema.plugin(autoIncrement.plugin,{
model:Models.ADMIN_MODEL_NAME,
field:'_id',
startAt:1,
incrementBy:1
});
const adminModel = mongoose.model(Models.ADMIN_MODEL_NAME, adminSchema);

module.exports = adminModel;