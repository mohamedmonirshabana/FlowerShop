const express = require('express');
const { authenticateToken, returnuserID } = require('../../Auth/Authentication.Auth');
const { createOrder, getOrderForStatus, getorderById, getorderforClient, updateOrderStatus, getOrderAndStatus } = require('../service/order.service');
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



module.exports = orderRout;