const express = require('express');
// const multer = require('multer');
const multerService = require('../../utils/multer.service');
// const uploadFLower= require('../../upload');
const flowerModel = require('../Schema/Flower.Schema');
const path = require("path");

const upload = multerService("uploads");


const flowerRouter = express.Router();
     

flowerRouter.post('/upload',upload.single("myfile"), (req, res, next) =>{
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
     flowerModel.create({flowername: flowerName, flowerphoto: path , price: price, description: description});
    res.send("File Create ");
    console.log(file);
});

module.exports = flowerRouter;