const express = require('express');
const {authenticateToken, returnuserID} = require('../../Auth/Authentication.Auth');
const clientModel = require('../schema/client.Schema');
const providerModel = require('../../provider/schema/provider.schema');
const usermodel = require('../../users/schema/user.schema');
const {check_client, add_client, find_near} = require('../service/client.service');

const clientRout = express.Router();



clientRout.post('/', authenticateToken , returnuserID ,async (req, res, next)=>{
    const loginId = req.userId;
    const checkuser = await check_client(loginId);
    if(!checkuser){
    const clientAdded = add_client(loginId);  //await clientModel.create({ clientID: loginId });
    res.status(200).send();
    // res.send(clientAdded._id);
    }else{
        res.status(400).send();
    }
    // res.send("Your ID is Exist");

});

clientRout.get('/', authenticateToken,async(req, res, next)=>{
    const lat = req.body.lat;  //req.body.lat;
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



module.exports= clientRout;