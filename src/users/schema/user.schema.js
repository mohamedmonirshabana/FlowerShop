const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const { USER_MODEL_NAME } = require('../../../common/constants');

const userSchema = new Schema({
    // _id:{type: Schema.Types.ObjectId },
    name:{type: String, required:true},
    email:{type: String, required: false , unique: true},
    phone: {type: String, required: true, unique: true},
    password:{type:String, required: true},
    profilepics:{type: String, required: true}
});
userSchema.plugin(autoIncrement.plugin,'USER_MODEL_NAME');

const userModel = Mongoose.model("USER_MODEL_NAME", userSchema);
 module.exports = userModel;