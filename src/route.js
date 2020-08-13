const express = require('express');
const app = express();



const router = express.Router();
const otpRout = require('./otp/controoller/opt.controller');
const userRout = require('./users/controller/user.controller');
const flowerRout = require('./flowers/Controller/flower.controller');
const clientRout = require('./client/controller/client.controoler');
const providerRoute = require("./provider/controller/provider.controller");
const adminRoute = require("./admin/controller/admin.controller");




app.use('/veryfy',otpRout);

app.use('/user', userRout);

app.use('/flower',flowerRout );

app.use('/clients', clientRout);

app.use('/providers', providerRoute);

app.use('/admins', adminRoute);






// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve);
// app.get('/api-docs', swaggerUi.setup(swaggerDocument,options));

module.exports = app;