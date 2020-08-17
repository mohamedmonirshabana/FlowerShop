const express = require('express');
const { authenticateToken, returnuserID } = require('../../Auth/Authentication.Auth');
const { createOrder, getOrderForStatus, getorderById, getorderforClient, updateOrderStatus, getOrderAndStatus } = require('../service/order.service');
const { validateOrder } = require('../dto/order.dto');

const orderRout = express.Router();

orderRout.post('/',authenticateToken,returnuserID,async(req, res, next) =>{
    //Add ORder 

    const clientID = req.userId;
    const providerID = req.body.providerID;
      const itemes = req.body.itemes;
      const resu = await createOrder(clientID,providerID,itemes);
      console.log("resss ", resu);
    res.status(200).send();
});
orderRout.get('/:orderid',authenticateToken, async(req,res, next) =>{
    const orderid = req.params.orderid;
    const order = await getorderById(orderid);
    if(order){
        res.status(200).json(order);
    }else{
        res.status(400).status();
    }
});
orderRout.patch('/:orderid/:status',authenticateToken, async(req, res, next) =>{
    const orderid = req.params.orderid;
    const status = req.params.status;
    const orderData = await getOrderAndStatus(orderid,status);


});




module.exports = orderRout;