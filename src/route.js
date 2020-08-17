const express = require('express');
const app = express();



const router = express.Router();
const otpRout = require('./otp/controoller/opt.controller');
const userRout = require('./users/controller/user.controller');
const flowerRout = require('./flowers/Controller/flower.controller');
const clientRout = require('./client/controller/client.controoler');
const providerRoute = require("./provider/controller/provider.controller");
const adminRoute = require("./admin/controller/admin.controller");
const orderRoute = require("./order/controller/order.controller");




app.use('/otp',otpRout);

app.use('/users', userRout);

app.use('/flowers',flowerRout );

app.use('/clients', clientRout);

app.use('/providers', providerRoute);

app.use('/admins', adminRoute);

app.use('/orders', orderRoute);





// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve);
// app.get('/api-docs', swaggerUi.setup(swaggerDocument,options));

module.exports = app;