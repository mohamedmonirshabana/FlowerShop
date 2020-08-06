const express = require('express');
// const providerModel = require('../schema/provider.schema');
const createRecord = require("../../realTime/provider.Service");
const multerService = require('../../utils/multer.service');
const  {authenticateToken, returnuserID} = require('../../Auth/Authentication.Auth');
const { addProvider } = require('../service/provider.service');
const upload = multerService('providerfile');
const providerRoute = express.Router();
let cpUpload = upload.fields([{ name: 'IDImages', maxCount: 2 },{ name: 'logoID', maxCount: 1 }]);
providerRoute.post("/addprovider",
    authenticateToken,
    returnuserID,
    cpUpload,
     (req, res, next) => {
        const userId = req.userId;
        const Logo = req.files;
        const lat = req.body.lat;
        const lng = req.body.lng;
        let LogoidImange;
        let imagearray = [];
        const resultforLogo = Logo["logoID"].map(result =>{
            const fil = JSON.stringify(result.filename);
            console.log("All for photo :"+fil);
            LogoidImange =req.protocol +"://"+ req.get("host")+"/uploads/"+fil;
        });
        const result2 = Logo["IDImages"].map(rese =>{
            imagearray.push(req.protocol +"://"+ req.get("host")+"/uploads/"+rese.filename);
        });
        addProvider(userId,LogoidImange,imagearray,lat, lng);
        createRecord();
        res.send("Finsh");
    });


module.exports = providerRoute;