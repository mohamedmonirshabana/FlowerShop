const express = require('express');
const { ValidateUser, validateUpdate} = require('../dto/user.dto');
const { json } = require('body-parser');
const multerService = require('../../utils/multer.service');
const upload = multerService("profiles");
const { generate_Access_Token,authenticateToken } = require('../../Auth/Authentication.Auth');
const { checkuser, checkphoneVerify, AddUser, loginuser,getuserID, updateuser, checkPassword, updatePassword, getuserData  } = require('../service/user.service');

const app = express();
const userRoute = express.Router();

userRoute.post('/signup', upload.single("profile") ,async (req, res , next) =>{
    const {error} = ValidateUser(req.body);
    if(error) {
        
        return res.status(400).send(error.details[0].meesage);
    }

    const profileimage = req.file;
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;

    const checkResult = await checkuser(email,phone);

   if(!checkResult){
       const verifyuser = await checkphoneVerify(phone);
       if(verifyuser){
        const profPath = req.protocol+"://"+req.get("host")+"/profiles/"+profileimage.filename;
        const userAdd = await AddUser(username, email, phone, password, profPath);
        const auth =await generate_Access_Token(userAdd);
        res.status(200).json({  username: req.body.username, email: req.body.email, phone: req.body.phone  , token: auth } );  
       }else{
           res.status(400).send("phone must verify");
       }
   }else{
    res.status(400).send("user is Exist");
   }

});

userRoute.post('/singin', async (req, res, next) =>{
    const name = req.body.username;
    const pass = req.body.password;

        const result = await loginuser(name, pass);
        if(result){
        const userID = await getuserID(name);
        const token = await  generate_Access_Token(userID);
        res.status(200).json({username: name, token: token});
        }else{
            res.status(400).send();
        }
});

 userRoute.patch('/:uid', authenticateToken,upload.single("profilepics") , async  (req, res) =>{
    const {error} = validateUpdate(req.body);
    if(error) return res.status(400).send(error.details[0].meesage);
    const name = req.body.username;
    const email = req.body.email;
    const profile = req.file;
        const profPath = req.protocol+"://"+req.get("host")+"/profiles/"+profile.filename;
        await updateuser(req.params.uid, name,email,profPath);
        const userData = await getuserData(req.params.uid);
        //   const userEdit = await userModel.findByIdAndUpdate({_id: req.params.uid},{email: email, name: name, profilepics : profPath});
        res.status(200).send(userData);
});

userRoute.post('/:uid/changepassword', authenticateToken, async(req, res) => {
    const userID = req.params.uid;
    const oldPassword = req.body.currentpassword;
    const newPassword = req.body.newPassword;
    const checkResult = await checkPassword(userID, oldPassword);
    if(checkResult){
        await updatePassword(userID, newPassword);
        res.status(200).send();
    }else{
        res.status(400).send();
    }
});


module.exports = userRoute;