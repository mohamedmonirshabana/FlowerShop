const express = require('express');
const mongoose = require('mongoose');
const bodyparse = require("body-parser");
const path = require('path');
const otpRout = require('./otp/controoller/opt.controller');
const initDS = require('./realTime/provider.Service');
const { init } = require('./AppSetting/service/appsetting.service');
const { APPSETTING_MODEL_NAME } = require('../common/constants');

const generalRoutes = require('./route');

const jwt = require('express-jwt');

const multer = require('multer');

// const {Deepstream} = require("@deepstream/client");
// const { Deepstream } = require('@deepstream/server');
// const server = new Deepstream('./config');
// server.start();

const app = express();

// const deepstream = new Deepstream();
// const client = deepstream('localhost:6020').login();

initDS();

app.use(bodyparse.urlencoded({urlencoded:false}));
app.use(bodyparse.json());


const public  =path.resolve("uploads");
const profile = path.resolve("profiles");

 app.use("/uploads", express.static(public));
 app.use("/profiles", express.static(profile));


// app.use( '/public',express.static( __dirname + "/public")); //Sucess Code

mongoose.connect('mongodb://localhost:27017/flowerShop');

init();

const port = process.env.PORT || 3000 ;

app.use(generalRoutes);

// init();

app.listen(port, () =>{
    console.log("App is working on "+port);
});