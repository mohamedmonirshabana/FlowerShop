const providerModel = require('../schema/provider.schema');

module.exports = {
    addProvider: async (userid, logoId, imageArray, lat, lng) =>{
        await providerModel.create({
            userID: userid,
            verify: true,
            logoID: logoId,
            IDimages: imageArray,
            location: {
                type:"Point",
                coordinates:[+lng,+lat]
            }
        });
    },
    checkforprovider:async (userId) =>{
        return await providerModel.findOne({userID: userId });
    }
};
