const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {PROVIDER_MODEL_NAME, USER_MODEL_NAME} = require('../../../common/constants');
const { schema } = require('../../otp/schema/otp.schema');
const autoIncrement = require('mongoose-auto-increment');

const providerSchema = new Schema({
    userID:{type: Schema.Types.ObjectId, ref: USER_MODEL_NAME},
    verifyed: {type:Boolean, required: true, default:false},
    logoID:{type: String, required:true},
    IDImages:{type: [String], required:false},
    location:{
        type:{
        type:String,
        default:"Point"
        },
        coordinates:{
            type:[Number]
        }
    }
});

providerSchema.plugin(autoIncrement.plugin,'PROVIDER_MODEL_NAME');

providerSchema.index({location: "2dsphere"});

const providerModel = mongoose.model("PROVIDER_MODEL_NAME",providerSchema);

module.exports = providerModel;

/*


location: { type: "Point", coordinates: [ -73.9375, 40.8303 ] }




*/