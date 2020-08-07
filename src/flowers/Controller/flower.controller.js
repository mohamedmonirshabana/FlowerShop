const express = require('express');
const multerService = require('../../utils/multer.service');
const flowerModel = require('../Schema/Flower.Schema');
const {createPhoto} = require('../service/flower.service');
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
    createPhoto(flowerName,path,price,description);
    res.send("File Create ");
});

module.exports = flowerRouter;