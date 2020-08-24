const express = require('express');
const multerService = require('../../utils/multer.service');
const flowerModel = require('../Schema/Flower.Schema');
const {createPhoto} = require('../service/flower.service');
const { validFlower } = require('../dto/flower.dto');
const upload = multerService("uploads");
const flowerRouter = express.Router();
const { authenticateToken } = require('../../Auth/Authentication.Auth');
     

flowerRouter.post('/',authenticateToken, upload.single("flower"), (req, res, next) =>{
    const { error } = validFlower(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const flowerName = req.body.flowerName;
    const price = parseFloat(req.body.price);
    const description = req.body.desc;
    const file = req.file;
    if(!file){
        const error =new Error("Please upload a file");
        error.httpStatusCode = 400;
        throw error("SSHHHHHHHHHHHHHHHHH");
    }
    const path =  req.protocol +"://"+ req.get("host")+"/uploads/"+file.filename;
    const flowerphoto = file.path.toString();
    createPhoto(flowerName,path,price,description);
    res.status(200).send();
});

module.exports = flowerRouter;