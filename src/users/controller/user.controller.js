const express = require('express');
const userModel = require('../schema/user.schema');
const otpModel = require('../../otp/schema/otp.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { json } = require('body-parser');
const validator = require("email-syntax-validator");
const  uploadProfile = require('../../uploadProfile');

const multerService = require('../../utils/multer.service');

const upload = multerService("profiles");

dotenv.config();

    async function generate_Access_Token(username){
        return await  jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
    }
    function authenticateToken(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }

   async function check_phone_on_DB(phoneNumber){
    const result = await otpModel.findOne({phone: phoneNumber});
    if(result === null){
        console.log("is not exist");
        throw new Error("phone Number not Exist");
    }
    const res = result.veryfy;
    console.log(res);
    return res;
    }
    function CheckifuserExist_by_phone(phone){
        const result = userModel.findOne({phone: phone});
        if(result !== null){
            return true;
        }
        return false;
    }
    function CheckifuserExist_by_Email(email){
        const result = userModel.findOne({email: email});
        if(result !== null){
            return true;
        }
        return false;
    }


  function Add_user_on_DB(userName, userEmail, phoneNumber, pass, profile){
      
    userModel.create({name: userName, email: userEmail, phone: phoneNumber, password: pass,profilepics: profile});
    // userModel.save();
}

 async function getID(phone){
     console.log("input phone "+phone);
   const R = await  userModel.findOne({phone: phone});
   console.log("MY R is "+R);
//    console.log("users Data " +R.phone);

}

const app = express();
const userRoute = express.Router();

async function validate_phone(phoneNumber, password){
    const getuser = await userModel.findOne({phone: phoneNumber});
    const hash = getuser.password;
    console.log(hash);
    const result = await bcrypt.compareSync(password, hash);
    console.log(" result is "+result);
    return result;
}


async function validate_Email(userEmail, password){
    const getuser = await userModel.findOne({email: userEmail});
    const hash = getuser.password;
    const result = bcrypt.compareSync(password, hash);
    return result;
}

async function getIDbyphone(phone){
    const getID = await userModel.findOne({phone: phone});
    return getID._id;
}
async function getIDbyEmail(email){
    const getID = await userModel.findOne({email: email});
    return getID._id;
}

async function update_user_data(usermail){

     const userData = await userModel.findOne({email: usermail});
     console.log("user Data"+ userData);
     const uid = userData._id;
     console.log(uid);
    //userModel.findByIdAndUpdate({_id: user})
}



userRoute.post('/signup', upload.single("profile") ,async (req, res , next) =>{
    const profileimage = req.file;
    let passhash = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;

    console.log("End by body parse");
   
    const check_by_phone = CheckifuserExist_by_phone(phone);
    console.log("check for phone "+ check_by_phone);
    if(check_by_phone){
        const phone_result = await  check_phone_on_DB(phone);
        console.log("photo Result "+ phone_result);
        if(phone_result){
            if(!profileimage){
                const error = new Error("Please upload Profile");
                error.httpStatusCode = 400;
                throw error("Shhhhhhhhhhhhhhhh");
            }
            console.log("arrive to image");
            const profPath = req.protocol+"://"+req.get("host")+"/profiles/"+profileimage.filename;
            const userAdd = await userModel.create({name: username, email: email, phone: phone, password: passhash,profilepics: profPath});
            const token = await  generate_Access_Token({username: userAdd._id});
            res.json({  username: req.body.username, email: req.body.email, phone: req.body.phone  , token: token } );  
        }else{
            next();
        }
    }

//    if(email == ""){
//        const check_by_phone = CheckifuserExist_by_phone(phone);
//        console.log("check for phone "+ check_by_phone);
//        if(!check_by_phone){
//            throw new Error("Phone is exist ");
//        }
//    }else if(phone == ""){
//        const Check_by_Email = CheckifuserExist_by_Email(email);
//         if(!Check_by_Email){
//             throw new Error("Email is exist ");
//         }
//    }
    
//     const phone_result = await  check_phone_on_DB(phone);
//     let message; 
//     if(phone_result){
//          await Add_user_on_DB(username, email, phone , passhash );
//          const token = await  generate_Access_Token({username: req.body.username});
//          res.json({  username: req.body.username, email: req.body.email, phone: req.body.phone  , token: token } );  
//     }else{
//         res.status(401);
//     }
});

userRoute.post('/singin', async (req, res, next) =>{
    const name = req.body.username;
    const pass = req.body.password;
    if(validator.validate(name)){

        const result = await validate_Email(name, pass);
        if(result){
        const userID = await getIDbyEmail(name);
        const token = await  generate_Access_Token({username: userID});
        res.json({username: name, token: token});
        }
    }else{
         const result = await validate_phone(name,pass);
         if(result){
         const userID = await  getIDbyphone(name);
         const token = await   generate_Access_Token({username: userID });
        res.json({username: name, token: token});
         }
    }
});

 userRoute.patch('/update/:uid', authenticateToken,upload.single("profilepics") , async  (req, res) =>{
    const name = req.body.username;
    const email = req.body.email;
    const profilepics = req.file;
    console.log(profilepics);
    if(validator.validate(email)){
        const profPath = req.protocol+"://"+req.get("host")+"/profiles/"+profilepics.filename;

          const userEdit = await userModel.findByIdAndUpdate({_id: req.params.uid},{email: email, name: name, profilepics : profPath});
        res.send("End of update");
    }else{
        res.status(401);
    }
});

userRoute.post('/changepassword/:uid', authenticateToken, async(req, res) => {
    const userID = req.params.uid;
    const oldPassword = req.body.currentpassword;
    const newPassword = req.body.newPassword;
    const userData = await userModel.findById(userID);
    const hash = userData.password;
    const oldcompare = bcrypt.compareSync(oldPassword, hash);
    if(oldcompare){
        
        const newpass = await bcrypt.hashSync(newPassword, 10);
        console.log("finish has "+ newpass);
        await userModel.findByIdAndUpdate({_id:userID}, {password:newpass});
        res.send("Update Password");
    }
    res.send("error");
    res.status(401);
});

userRoute.get('/us',(req, res) =>{
    res.send("user");
});



module.exports = userRoute;