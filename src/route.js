const express = require('express');
const app = express();
const router = express.Router();
const otpRout = require('./otp/controoller/opt.controller');
const userRout = require('./users/controller/user.controller');

// router('/veryfy',() => {
//     app.use(otpRout);
// });

app.use('/veryfy',otpRout);

app.use('/user', userRout);

module.exports = app;