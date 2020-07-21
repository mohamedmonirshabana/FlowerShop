const express = require('express');
const mongoose = require('mongoose');
//import { rout } from './otp/controoller/opt.controller';
const rout = require('./otp/controoller/opt.controller');

const app = express();

mongoose.connect('mongodb://localhost:27017/flowerShop');

const port = 3000;

app.use(rout);
// app.get('/signup',(req, res, next)=>{

// });


app.listen(port, () =>console.log("App is working on "+port));