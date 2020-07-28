const express = require('express');
const multer = require('multer');
const uploadFLower= require('../../upload');
const flowerModel = require('../Schema/Flower.Schema');
const path = require("path");


const flowerRouter = express.Router();
     

flowerRouter.post('/upload',uploadFLower.single("myfile"), (req, res, next) =>{
    const flowerName = req.body.flowerName;
    const price = parseFloat(req.body.price);
    const description = req.body.desc;
    const file = req.file;
    if(!file){
        const error =new Error("Please upload a file");
        error.httpStatusCode = 400;
        throw error("SSHHHHHHHHHHHHHHHHH");
        // return next(error);
    }
    //res.send(file);

    const path =  req.protocol +"://"+ req.get("host")+"/uploads/"+file.filename;
    const flowerphoto = file.path.toString();
     flowerModel.create({flowername: flowerName, flowerphoto: path , price: price, description: description});
    res.send("File Create ");
    console.log(file);
});

module.exports = flowerRouter;