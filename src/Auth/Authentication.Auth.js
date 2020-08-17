const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


module.exports = {
    authenticateToken : function (req, res, next){
        const token = req.headers.authorization.split(' ')[1];       
        if(token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
            if(err) {
                console.log("ERROE",err);
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    },
    generate_Access_Token: async function(username){
        return await jwt.sign({username: username}, process.env.TOKEN_SECRET, { expiresIn: '180000s' });
    },
    returnuserID: (req, res, next) =>{
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token);
        req.userId = decoded.username;
        next();
    }
};
