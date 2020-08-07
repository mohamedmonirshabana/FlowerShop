const express = require('express');
const providermodel = require('../../provider/schema/provider.schema');
const adminModel = require('../Schema/admin.Schema');
const deepstream = require('deepstream.io-client-js');
// const { DeepstreamClient } = require('@deepstream/client');
const generate_record = require('../../realTime/provider.Service');

const { authenticateToken,returnuserID } = require('../../Auth/Authentication.Auth');
const { check_admin, add_admin, update_provider } = require('../service/admin.service');

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

  let  user_token;

adminRoute.post('/addadmin',
authenticateToken,
returnuserID,
async(req,res,next)=>{
    const user_ID = req.userId;
    const resultAdmin = check_admin(user_ID);
    if(!resultAdmin){
        add_admin( user_ID);
        res.send("Admin Add");
    }
    
});

adminRoute.patch('/verifyproviders', authenticateToken, async (req, res, next) =>{
    // const client = deepstream('localhost:6020',options);
   
    const proviers = req.body.providers;
    update_provider(proviers);
    // await providermodel.update(
    //     {providerArray: proviers},
    //     {$inc:{"providerArray.$[verifyed]": true}}
    // );
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