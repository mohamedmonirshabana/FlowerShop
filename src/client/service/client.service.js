const clientModel = require('../schema/client.Schema');
const providerModel = require('../../provider/schema/provider.schema');
const appsettings = require('../../AppSetting/schema/appsetting.Schema');

module.exports = {
    check_client: async (userId) =>{
        const userData = await clientModel.findOne({clientID: userId});
        return userData;
    },
    add_client: async (userID) =>{
         const client = await clientModel.create({clientID: userID});
         client.save();
    },
    find_near: async (lat, lng) =>{
        const settings = appsettings.findOne();

        const Providers = await providerModel.finde.agregate([
            {$geoNear :{
                near:{
                    type:"Point",
                    coordinates:[+lng,+lat]
                },
                distanceField: "distance",
                maxDistance:  settings.minDistanceInKM *1000,
                spherical: true
            }}
        ]);
        return Providers;
    },
    
};
