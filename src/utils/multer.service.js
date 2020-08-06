// const express = require('express');
const multer = require('multer');
const path= require('path');
const fs= require('fs');





function multerService(imagepath){
    const storage = multer.diskStorage({
        destination:(req, file, cb) =>{
             
            cb(null, path.resolve(imagepath));
        },
        filename:(req, file, cb)=>{
            const uniqueSuffix = Date.now() + '-'+Math.round(Math.random() * 1E9 );
            const exten = file.originalname.split('.')[1];
            const ex = file.mimetype;
            console.log("File Extention is "+ ex);
            file.fieldname = uniqueSuffix+"."+exten;
            console.log("extention");
            cb(null, file.fieldname);
            // cb(null, file.originalname);
            // cb(null, file.originalname+'-'+uniqueSuffix+'-'+exten);
        }
    });

    const fileFilter = (req, file,cb) =>{
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
            cb(null, true); 
        }else{
            cb(null, false);
        }
        
    };
    

    const  upload = multer({
        storage: storage, 
        limits:{
            fieldSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });
    return upload;
}

function imageNameURL(imagename){
    
}

module.exports = multerService;