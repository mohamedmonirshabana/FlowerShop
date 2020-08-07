const clientModel = require('../schema/client.Schema');
const providerModel = require('../../provider/schema/provider.schema');

module.exports = {
    check_client: async (userId) =>{
        return await clientModel.findOne({clientID: userId});
    },
    add_client: async (userID) =>{
         await clientModel.create({clientID: userID});
    },
    find_near: async (lat, lng) =>{
        const result = await providerModel.finde({
            location:{
                $near:{
                    $geometry:{
                        type:"point",
                        coordinates:[+lng, +lat],
                        $minDistance: 1000,
                        $maxDistance: 5000
                    }
                }
            }
        });
        return result;
    },
    
};