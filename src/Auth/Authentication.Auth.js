const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports =   function generate_Access_Token(username){
    return   jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
};