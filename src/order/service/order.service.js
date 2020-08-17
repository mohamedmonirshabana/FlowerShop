const orderModel = require('../schema/order.schema');

module.exports = {
    createOrder: async (clientID,providerID, itemeArray)=>{
        await orderModel.create({
            client: clientID,
            provider: providerID,
            itemes: itemeArray
        });
    },
    getorderById: async (orderID) =>{
        return await orderModel.findOne({_id: orderID});
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