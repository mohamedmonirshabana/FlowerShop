const express = require('express');
const {validate, validateUpdate} = require('../dto/user.dto');
const { json } = require('body-parser');
const multerService = require('../../utils/multer.service');
const upload = multerService("profiles");
const { generate_Access_Token,authenticateToken,returnuserID } = require('../../Auth/Authentication.Auth');
const { checkphone,checkuser, checkphoneVerify, AddUser, loginuser,getuserID, updateuser, checkPassword, updatePassword  } = require('../service/user.service');

const app = express();
const userRoute = express.Router();

userRoute.post('/signup', upload.single("profile") ,async (req, res , next) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].meesage);
    const profileimage = req.file;
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
   if(checkuser(email) || checkphone(phone) ){
        res.status(400).send("user is Exist");
   }
   const verifyuser = checkphoneVerify(phone);
   if(verifyuser.veryfy){
    const profPath = req.protocol+"://"+req.get("host")+"/profiles/"+profileimage.filename;
    const userAdd = AddUser(username, email, phone, password, profPath);
    const auth =await  generate_Access_Token(userAdd);
    res.json({  username: req.body.username, email: req.body.email, phone: req.body.phone  , token: auth } );  
   }else{
       next();
   }
});

userRoute.post('/singin', async (req, res, next) =>{
    const name = req.body.username;
    const pass = req.body.password;
        //name is Email
        const result = await loginuser(name, pass);
        console.log("result is "+ result);
        if(result){
        const userID = await getuserID(name);
        const token = await  generate_Access_Token({username: userID});
        res.json({username: name, token: token});
        }else{
            res.send("Eror");
        }
});

 userRoute.patch('/update/:uid', authenticateToken,upload.single("profilepics") , async  (req, res) =>{
    const {error} = validateUpdatee(req.body);
    if(error) return res.status(400).send(error.details[0].meesage);
    const name = req.body.username;
    const email = req.body.email;
    const profilepics = req.file;
        const profPath = req.protocol+"://"+req.get("host")+"/profiles/"+profilepics.filename;
        await updateuser(req.params.uid, name,email,profPath);
        //   const userEdit = await userModel.findByIdAndUpdate({_id: req.params.uid},{email: email, name: name, profilepics : profPath});
        res.send("End of update");
});

userRoute.post('/changepassword/:uid', authenticateToken, async(req, res) => {
    const userID = req.params.uid;
    const oldPassword = req.body.currentpassword;
    const newPassword = req.body.newPassword;
    const checkResult = await checkPassword(userID, oldPassword);
    if(checkResult){
        await updatePassword(userID, newPassword);
    }else{
        res.status(400).send("your password is not correct ");
    }
});


module.exports = userRoute;