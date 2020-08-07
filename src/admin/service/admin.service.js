const adminModel = require('../Schema/admin.Schema');
const providerModel = require('../../provider/schema/provider.schema');s

module.exports = {
    check_admin: async (userid) =>{
        return await adminModel.findOne({userID: userid});
    },
    add_admin: async ( userid ) =>{
        await adminModel.create({userID: userid});
    },
    update_provider: async (providers) =>{
        await providerModel.update(
            {providerArray: providers},
            {$inc:{"providerArray.$[verifyed]": true}}
        );
    }
};