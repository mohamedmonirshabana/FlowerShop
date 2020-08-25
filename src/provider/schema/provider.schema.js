const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Models  = require('../../../common/constants');
const { schema } = require('../../otp/schema/otp.schema');
const autoIncrement = require('mongoose-auto-increment');

//{PROVIDER_MODEL_NAME, USER_MODEL_NAME}

const providerSchema = new Schema({
    userID:{type: Number , ref: Models.USER_MODEL_NAME},
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
autoIncrement.initialize(mongoose.connection);

providerSchema.plugin(autoIncrement.plugin,{
    model:Models.PROVIDER_MODEL_NAME,
    field: '_id',
    startAt:1,
    incrementBy:1
});

providerSchema.index({location: "2dsphere"});

const providerModel = mongoose.model( Models.PROVIDER_MODEL_NAME,providerSchema);

module.exports = providerModel;



/*


location: { type: "Point", coordinates: [ -73.9375, 40.8303 ] }




*/