const express = require('express');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bodyparse = require("body-parser");
const path = require('path');
const otpRout = require('./otp/controoller/opt.controller');
const initDS = require('./realTime/provider.Service');
const { init } = require('./AppSetting/service/appsetting.service');
const { APPSETTING_MODEL_NAME } = require('../common/constants');
const swaggerUi = require('swagger-ui-express');
const swaggerJsondoc =require('swagger-jsdoc');
const swaggerDocs = require('./middlewares/swagger');
const generalRoutes = require('./route');

const jwt = require('express-jwt');

const multer = require('multer');


const app = express();

swaggerDocs(app);



app.use(bodyparse.urlencoded({urlencoded:false}));
app.use(bodyparse.json());


const public  =path.resolve("uploads");
const profile = path.resolve("profiles");

 app.use("/uploads", express.static(public));
 app.use("/profiles", express.static(profile));

 

// app.use( '/public',express.static( __dirname + "/public")); //Sucess Code

// mongoose.connect('mongodb://localhost:27017/flowerShop');
mongoose.connect('mongodb+srv://monir:index123456@cluster0.vwkya.mongodb.net/<dbname>?retryWrites=true&w=majority');
mongoose.connection.on('error', err => {
    console.log(err);
  });
  
//mongodb://monir:index@12@cluster0-shard-00-00.vwkya.mongodb.net:27017,cluster0-shard-00-01.vwkya.mongodb.net:27017,cluster0-shard-00-02.vwkya.mongodb.net:27017/flowershop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority


autoIncrement.initialize(mongoose.connection);

init();

const port = process.env.PORT || 3000 ;

app.use(generalRoutes);


app.listen(port, () =>{
    console.log("App is working on "+port);
});