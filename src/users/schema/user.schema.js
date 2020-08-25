const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const Models  = require('../../../common/constants');

//{ USER_MODEL_NAME }

const userSchema = new Schema({
    // _id:{type: Schema.Types.ObjectId },
    name:{type: String, required:true},
    email:{type: String, required: false , unique: true},
    phone: {type: String, required: true, unique: true},
    password:{type:String, required: true},
    profilepics:{type: String, required: true}
});
autoIncrement.initialize(Mongoose.connection);
userSchema.plugin(autoIncrement.plugin,{
    model:Models.USER_MODEL_NAME,
    field: '_id',
    startAt:1,
    incrementBy:1
});



const userModel = Mongoose.model( Models.USER_MODEL_NAME, userSchema);
module.exports = userModel;
