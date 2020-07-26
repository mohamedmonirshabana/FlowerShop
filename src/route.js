const express = require('express');
const app = express();
const router = express.Router();
const otpRout = require('./otp/controoller/opt.controller');
const userRout = require('./users/controller/user.controller');
const flowerRout = require('./flowers/Controller/flower.controller');

// router('/veryfy',() => {
//     app.use(otpRout);
// });

app.use('/veryfy',otpRout);

app.use('/user', userRout);

app.use('/flower',flowerRout );

module.exports = app;