const express = require('express');
const jwt = require('jsonwebtoken');
const adminmodel = require('../Schema/admin.Schema');
const providermodel = require('../../provider/schema/provider.schema');
const adminModel = require('../Schema/admin.Schema');
const deepstream = require('deepstream.io-client-js');
// const { DeepstreamClient } = require('@deepstream/client');
const generate_record = require('../../realTime/provider.Service');

const adminRoute = express.Router();

const options = {
    // Reconnect after 10, 20 and 30 seconds
    reconnectIntervalIncrement: 10000,
    // Try reconnecting every thirty seconds
    maxReconnectInterval: 30000,
    // We never want to stop trying to reconnect
    maxReconnectAttempts: Infinity,
    // Send heartbeats only once a minute
    heartbeatInterval: 60000
};


// const client = deepstream('localhost:6020',options);
// client.login({},(success) =>{

// });

// const client = new DeepstreamClient('localhost:6020', options);
// client.login();

// const connectionStateIndicator = ('#connection-state-indicator');
// client.on('connectionStateChanged', connectionState => {
//     connectionStateIndicator.removeClass('good neutral bad')
//     switch (connectionState) {
//         case 'OPEN':
//             connectionStateIndicator.addClass('good')
//             break
//         case 'CLOSED':
//         case 'ERROR':
//             connectionStateIndicator.addClass('bad')
//             break
//         default:
//             connectionStateIndicator.addClass('neutral')
//     }
// });
  let  user_token;

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    user_token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function returnuserID(req,res, next){
    const authHeader= req.Headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    req.userId = decoded.username;
    next();
}

async function checkifuserExit(userid){
    return await adminModel.findOne({userID: userid});
}

adminRoute.post('/addadmin',
authenticateToken,
returnuserID,
async(req,res,next)=>{
    const user_ID = req.userId;
    const resultAdmin = checkifuserExit(user_ID);
    if(!resultAdmin){
        adminModel.create({userID: user_ID});
        res.send("Admin Add");
    }
    
});

adminRoute.patch('/verifyproviders', authenticateToken, async (req, res, next) =>{
    // const client = deepstream('localhost:6020',options);
   
    const proviers = req.body.providers;
    await providermodel.update(
        {providerArray: proviers},
        {$inc:{"providerArray.$[verifyed]": true}}
    );
    proviers.map( async (result) =>{

        // let provider ={};
        // server.set('provider',proviers);
        // await providermodel.findByIdAndUpdate({_id:result},{verifyed: true});
        generate_record(user_token,result,'busy');
        // client.login({
        //     token: user_token
        // },(success, data) =>{
        //     if(success){
        //         const provider_record = client.record.getRecord(`provider/${client.getUid()}`);
        //         provider_record.set({
        //             provider: result,
        //             status:'busy' 
        //         });
    
        //     }
        // });

        // provider.record = client.record.getRecord("provider");

        // provider.set("provStatus","busy");

        // const recordName = `user/${client.getUid()}`;
        // const record = client.record.getRecord(recordName);
        // record.set({
        //     provider:result,
        //     status:'busy'
        // });
        // console.log("result for prov : "+result);
    });
    res.send("thanks");
});

module.exports = adminRoute;