const { populate } = require('../schema/order.schema');
const orderModel = require('../schema/order.schema');
const providerModel = require('../../provider/schema/provider.schema');

module.exports = {
    createOrder: async (clientID,providerID, itemeArray)=>{
      
        const checkProvider= await providerModel.findOne({userID:providerID});
        console.log("check prov", checkProvider);
        if(checkProvider !== null){
            const orderCreate = await orderModel.create({
                client: clientID,
                provider: checkProvider._id,
                items: itemeArray
            });
            return  orderCreate;
        }
        return false;
      
    },
    getorderById: async (orderID) =>{
        const result = await orderModel.find({_id: orderID}).populate({path:'provider',select:'userID', populate:{path:'userID',select:'name'}});
        console.log(result);
        return result;
    },
    getorderforClient: async (clientID) =>{
        return await orderModel.find({client: clientID});
    },
    updateOrderStatus: async (orderID, status) =>{  
        await orderModel.findByIdAndUpdate({_id: orderID}, {status: status});
    },
    getOrderForStatus: async (status) =>{
        return await orderModel.find({status: status});
    },
    getOrderAndStatus: async(orderid, status) =>{
        return await orderModel.findOne({$and:[{_id:orderid},{status:status}]});
    }

};