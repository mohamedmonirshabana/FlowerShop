const express = require('express');
const createRecord = require("../../realTime/provider.Service");
const multerService = require('../../utils/multer.service');
const  {authenticateToken, returnuserID} = require('../../Auth/Authentication.Auth');
const { addProvider,checkforprovider } = require('../service/provider.service');
const {providerValidate} = require('../dto/provider.dto');
const upload = multerService('providerfile');
const providerRoute = express.Router();
let cpUpload = upload.fields([{ name: 'IDImages', maxCount: 2 },{ name: 'logoID', maxCount: 1 }]);
providerRoute.post("/",
    authenticateToken,
    returnuserID,
    cpUpload,
     async (req, res, next) => {
         const {error} = providerValidate(req.body);
         if(error) return res.status(400).send(error.details[0].message);
        const userId = req.userId;
        const Logo = req.files;
        const lat = req.body.lat;
        const lng = req.body.lng;
        let LogoidImange;
        let imagearray = [];
        const resultforLogo = Logo["logoID"].map(result =>{
            const fil = JSON.stringify(result.filename);
            LogoidImange =req.protocol +"://"+ req.get("host")+"/uploads/"+fil;
        });
        const result2 = Logo["IDImages"].map(rese =>{
            imagearray.push(req.protocol +"://"+ req.get("host")+"/uploads/"+rese.filename);
        });
        const check_provider = await checkforprovider(userId);
        if(check_provider){
            res.status(400).send("Error user exist");
        }else{
        await addProvider(userId,LogoidImange,imagearray,lat, lng);
        await  createRecord();
        res.status(200).send("user add to provider");
        }
    });


module.exports = providerRoute;