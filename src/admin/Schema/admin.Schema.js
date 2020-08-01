const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ADMIN_MODEL_NAME} = require('../../../common/constants');

const adminSchema = new Schema({
    userID:{type: Schema.Types.ObjectId, ref:'user_model_names'}
});

const adminModel = mongoose.model("ADMIN_MODEL_NAME", adminSchema);

module.exports = adminModel;