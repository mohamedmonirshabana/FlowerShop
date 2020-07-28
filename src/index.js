const express = require('express');
const mongoose = require('mongoose');
const bodyparse = require("body-parser");
const path = require('path');
const otpRout = require('./otp/controoller/opt.controller');

const generalRoutes = require('./route');

const jwt = require('express-jwt');

const multer = require('multer');

const app = express();

app.use(bodyparse.urlencoded({urlencoded:false}));
app.use(bodyparse.json());


const public  =path.resolve("uploads");
const profile = path.resolve("profiles");

 app.use("/uploads", express.static(public));
 app.use("/profiles", express.static(profile));

// app.use( '/public',express.static( __dirname + "/public")); //Sucess Code

mongoose.connect('mongodb://localhost:27017/flowerShop');

const port = 3000 || process.env.PORT ;

app.use(generalRoutes);


app.listen(port, () =>{
    console.log("App is working on "+port);
});