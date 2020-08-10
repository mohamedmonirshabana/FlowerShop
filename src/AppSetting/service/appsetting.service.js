const appSettingModel = require('../schema/appsetting.Schema');
const mongoose = require('mongoose');
const { APPSETTING_MODEL_NAME } = require('../../../common/constants');

module.exports = {
    init : async ()=>{
            const res = await appSettingModel.find();
            if(res){
                await appSettingModel.create({minDistanceInKM:5});
            }
            // await appSettingModel.create({minDistanceInKM:5});
        }
    
};