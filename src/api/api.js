const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'FlowerShopApi',
            description:"FlowerShop AP information",
            contact:{
                name: "Mohamed Shabana"
            },
            server: ["https://flowershoppro.herokuapp.com/"]   
        //"http://localhost:3000/"
        }
    },
    apis:["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));