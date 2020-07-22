const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const { USER_MODEL_NAME } = require('../../../common/constants');

const userSchema = new Schema({
    name:{type: String, required:true},
    email:{type: String, required: false},
    phone: {type: String, required: true},
    password:{type:String, required: true}
});

const userModel = Mongoose.model("USER_MODEL_NAME", userSchema);
module.exports = userModel;