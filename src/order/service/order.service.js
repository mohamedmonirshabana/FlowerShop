const { populate } = require('../schema/order.schema');
const orderModel = require('../schema/order.schema');
const providerModel = require('../../provider/schema/provider.schema');
const Models = require('../../../common/constants');
const flowerModel = require('../../flowers/Schema/Flower.Schema');
const { getPrice } = require('../../flowers/service/flower.service');

module.exports = {
    createOrder: async (clientID,providerID, itemeArray)=>{
        const checkProvider= await providerModel.findOne({userID:providerID});
        if(checkProvider !== null){
            // const total = await this.countFlower(itemeArray);
            let total = 0 ;
            for(let i=0; i< itemeArray.length; i++){
                total += await getPrice(itemeArray[i]);
            }

            const orderCreate = await orderModel.create({
                client: clientID,
                provider: checkProvider._id,
                items: itemeArray,
                totalPrice: Math.round(total)
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
        return await orderModel.findByIdAndUpdate({_id:orderid},{status: status});   //({$and:[{_id:orderid},{status:status}]});
    },
    getorderCount: async(clientID) =>{
        console.log("Hellow Service ", clientID);
        const recordCount = await orderModel.find({client: clientID}).count();
        console.log("the number is ", recordCount.toString());
        return recordCount;
    },
    getorder:async(clientID, pagenumber,pagesize, limit)=>{
        const pageNumber = parseInt(pagenumber);
        const pageSize = parseInt(pagesize);
        const Limit = parseInt(limit);
        const records = await orderModel.find({client: clientID}).skip((pageNumber -1)* Limit).limit(Limit).sort({createdAt:1}).populate({path:"items", select:"flowername"});
        return records;
    },
    countFlower: async(flowerArray) =>{
        let total ;
        flowerArray.forEach(async item => {
            const flowerprice = await flowerModel.findById(item);
            total += flowerprice.price;
        });

        return total;
    }

};