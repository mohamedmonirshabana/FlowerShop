const express = require('express');
const {authenticateToken, returnuserID} = require('../../Auth/Authentication.Auth');
const clientModel = require('../schema/client.Schema');
const providerModel = require('../../provider/schema/provider.schema');
const usermodel = require('../../users/schema/user.schema');
const {check_client, add_client, find_near} = require('../service/client.service');

const clientRout = express.Router();



clientRout.post('/addclient', authenticateToken , returnuserID ,async (req, res, next)=>{
    const loginId = req.userId;
    const checkuser = check_client(loginId);
    if(!checkuser){
    const clientAdded = add_client(loginId);  //await clientModel.create({ clientID: loginId });
    // res.send(clientAdded._id);
    }
    res.send("Your ID is Exist");

});

clientRout.get('/findnear/:lat/:lng', authenticateToken,async(req, res, next)=>{
    const lat = req.param.lat;  //req.body.lat;
    const lng = req.param.lng;

    const result = find_near(lat,lng);
        res.send(result);
});

clientRout.post('/findbyName', authenticateToken, async(req, res)=>{
    const name = req.body.providername;
    const userdata = usermodel.find({name: name});
    const providerData= providerModel.find({userID: userdata._id});
    res.send(providerData);
});



module.exports= clientRout;