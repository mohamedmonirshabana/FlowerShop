const express = require('express');
const mongoose = require('mongoose');
const bodyparse = require("body-parser")
//import { rout } from './otp/controoller/opt.controller';
const otpRout = require('./otp/controoller/opt.controller');

const generalRoutes = require('./route');

const app = express();


app.use(bodyparse.urlencoded({urlencoded:false}));
app.use(bodyparse.json());


mongoose.connect('mongodb://localhost:27017/flowerShop');

const port = 3000;

app.use(generalRoutes);

// app.use(otpRout);

// app.get('/signup',(req, res, next)=>{

// });


app.listen(port, () =>console.log("App is working on "+port));