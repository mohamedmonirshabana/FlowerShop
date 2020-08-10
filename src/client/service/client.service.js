const clientModel = require('../schema/client.Schema');
const providerModel = require('../../provider/schema/provider.schema');
const appsettings = require('../../AppSetting/schema/appsetting.Schema');

module.exports = {
    check_client: async (userId) =>{
        return await clientModel.findOne({clientID: userId});
    },
    add_client: async (userID) =>{
         await clientModel.create({clientID: userID});
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
