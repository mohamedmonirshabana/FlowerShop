const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/flowerShop');

const port = 3000;

// app.get('/signup',(req, res, next)=>{

// });


app.listen(port, () =>console.log("App is working on "+port));