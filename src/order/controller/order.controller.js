const express = require('express');
const { authenticateToken, returnuserID } = require('../../Auth/Authentication.Auth');
const { createOrder, getOrderForStatus, getorderById, getorderforClient, updateOrderStatus, getOrderAndStatus, getorderCount,getorder } = require('../service/order.service');
const { validateOrder } = require('../dto/order.dto');

const orderRout = express.Router();

orderRout.post('/',authenticateToken,returnuserID,async(req, res, next) =>{
    const { error } = validateOrder(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const itemsArray = req.body.itemes;
    const clientID = req.userId;
    const providerID = req.body.providerID;
    const resu = await createOrder(clientID,providerID,itemsArray);
    if(!resu){
        res.status(400).send();
    }
    res.status(200).send(resu);
});
orderRout.get('/:orderid',authenticateToken,async(req,res, next) =>{
    const orderid = req.params.orderid;
    const order = await getorderById(orderid);
    console.log("My Order is ", order);
    if(order){
       const result = JSON.stringify(order);
        res.status(200).send(result);
    }else{
        res.status(400).status();
    }
});
orderRout.patch('/:orderid/:status',authenticateToken, async(req, res, next) =>{
    const orderid = req.params.orderid;
    const status = req.params.status;
    const orderData = await getOrderAndStatus(orderid,status);
    res.status(200).send();
});

orderRout.get('/:status',authenticateToken,async (req, res, next)=>{
    const orderStatus = req.params.status;
    const orders = await getOrderForStatus(orderStatus);
    if(orders){
        res.status(200).json(orders);
    }else{
        res.status(400).send();
    }
});

orderRout.get('/client/:pagenumber',authenticateToken, returnuserID, async(req, res, next) =>{
    console.log("Start Here");
    const clientid = req.userId;
    console.log("user ID ", clientid);
    const dbrecord = await getorderCount(clientid);
    // res.status(200).json(dbrecord.toString());
        const recordcount = dbrecord / 5;
        console.log(recordcount);
        const pagenumber = req.params.pagenumber;
        const pageSize = 5;
        const records = await getorder(clientid, recordcount, pagenumber, pageSize ); 
        if(parseInt(pagenumber) > recordcount){
            res.status(404).send("not Found");
        }
        res.status(200).json(records);
        // res.status(200).json(records);
    

    //get count of record in DB 
    // limit size in every page 
    // C / s  = how many pages in 
    //when add page number contain and skip for DB 
    // if you enter big number than c return error 404 

});



module.exports = orderRout;