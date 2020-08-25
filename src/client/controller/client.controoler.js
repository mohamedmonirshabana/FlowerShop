const express = require('express');
const {authenticateToken, returnuserID} = require('../../Auth/Authentication.Auth');
const clientModel = require('../schema/client.Schema');
const providerModel = require('../../provider/schema/provider.schema');
const usermodel = require('../../users/schema/user.schema');
const {check_client, add_client, find_near} = require('../service/client.service');
const { getorder, getorderCount } = require('../../order/service/order.service');
const clientRout = express.Router();



clientRout.post('/', authenticateToken , returnuserID ,async (req, res, next)=>{
    const loginId = req.userId;
    console.log(" user ID  "+loginId);
    const checkuser = await check_client(+loginId);
    console.log(checkuser);
    if(!checkuser){
    const clientAdded = await add_client(loginId);  //await clientModel.create({ clientID: loginId });
    res.status(200).send();
    res.send(clientAdded._id);
    }else{
        res.status(400).send();
    }
    // res.send("Your ID is Exist");

});

clientRout.get('/', authenticateToken,async(req, res, next)=>{
    const lat = req.body.lat; 
    const lng = req.body.lng;

    const result = await find_near(lat,lng);
        res.status(200).send(result);
});

clientRout.post('/findbyName', authenticateToken, async(req, res)=>{
    const name = req.body.providername;
    const userdata = usermodel.find({name: name});
    const providerData= providerModel.find({userID: userdata._id});
    res.send(providerData);
});

clientRout.get('/orders',authenticateToken, async(req, res, next) =>{
    const clientid = req.query.userId;
    const pagenumber = req.query.pagenumber;
    const pageSize = await getorderCount(clientid);
    const limit = req.query.limit;
    console.log("Paramater ", pagenumber , pageSize, limit, clientid);
    const records = await getorder(clientid, pagenumber, pageSize,limit ); 
    if(records === null){
        res.status(400).send();
    }
    res.status(200).json(records);
});


module.exports= clientRout;