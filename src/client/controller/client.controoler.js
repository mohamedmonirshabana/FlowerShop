const express = require('express');
const jwt = require('jsonwebtoken');
const clientModel = require('../schema/client.Schema');
const dotenv = require('dotenv');


dotenv.config();



function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null ) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET,(err, user) =>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function retrurnUserID(req, res, next){
    console.log("Hello Med");
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    console.log("user id Is :"+decoded.username);
    req.userId = decoded.username;
    next();
}

const clientRout = express.Router();

async function check_if_client_exist(userID){
    const result = await clientModel.findOne({clientID: userID});
    console.log("ower REsult is "+result);
    return result;
}

clientRout.post('/addclient', authenticateToken , retrurnUserID ,async (req, res, next)=>{
    console.log("hello");
    const loginId = req.userId;
    console.log("user id is "+ loginId);
    const checkuser = check_if_client_exist(loginId);
    console.log("result is "+ checkuser);
    if(!checkuser){
    const clientAdded = await clientModel.create({ clientID: loginId });
    res.send(clientAdded._id);
    }
    res.send("Your ID is Exist");

});



module.exports= clientRout;