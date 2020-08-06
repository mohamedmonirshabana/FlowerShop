const express = require('express');
const providerModel = require('../schema/provider.schema');
// const multer = require('multer');
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const providerRoute = express.Router();
//const upload = require("../../upload");
const createRecord = require("../../realTime/provider.Service");
// var uploadArr = multer({ dest: 'uploads/' });

const multerService = require('../../utils/multer.service');
const { type } = require('os');


// const app = express();

const upload = multerService('providerfile');
// const manyupload = multerService(path.resolve("providerFile/IDImages"));
// const {deepstream} = require('@deepstream/server');
// const ds = require('@deepstream/client');

// const server = new deepstream();
// server.start();
// const client = server('localhost:6020').login();
// const pic = ds.record.getRecord('driver/14');

// pic.set({
//     name:"jj"
// });

// pic.subscribe((data) =>{});
// pic.event.emit('sisn',{name:'big'});



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function returnUserID(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    req.userId = decoded.username;
    next();
}

let cpUpload = upload.fields([{ name: 'IDImages', maxCount: 2 },{ name: 'logoID', maxCount: 1 }]);

providerRoute.post("/addprovider",
    authenticateToken,
    returnUserID,
    cpUpload,
     (req, res, next) => {
        const userId = req.userId;
        const Logo = req.files;
        const lat = req.body.lat;
        const lng = req.body.lng;
        console.log(" Location "  + lat+"   "+ lng);
        let LogoidImange;
        let imagearray = [];
        const resultforLogo = Logo["logoID"].map(result =>{
            // JSON.stringify(my_obj);
            const fil = JSON.stringify(result.filename);
            console.log("All for photo :"+fil);
            LogoidImange =req.protocol +"://"+ req.get("host")+"/uploads/"+fil;
        });
        const result2 = Logo["IDImages"].map(rese =>{
            imagearray.push(req.protocol +"://"+ req.get("host")+"/uploads/"+rese.filename);
        });
        
        //const lat = parseFloat(lat_string);
        // const lng = parseFloat(lng_string);
        // parseFloat()
        providerModel.create({
            userID: userId, 
            verify: true,
            logoID: LogoidImange, 
            IDImages:imagearray,
            location:{
                type:"Point",
                coordinates:[+lng,+lat] 
            }
        });
        
        createRecord();
        res.send("Finsh");
    });


module.exports = providerRoute;