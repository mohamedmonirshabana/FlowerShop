const express = require('express');
const userModel = require('../schema/user.schema');
const otpModel = require('../../otp/schema/otp.schema');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync(myPlaintextPassword, salt);

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


  function Add_user_on_DB(userName, userEmail, phoneNumber, pass){
     userModel.create({name: userName, email: userEmail, phone: phoneNumber, password: pass});
}

const app = express();
const userRoute = express.Router();

userRoute.post('/signup', async (req, res) =>{
    const pas  = req.body.password;
    let passhash = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
   console.log("Email "+email);
   if(email == ""){
       console.log("Email is Empty");
   }
    const phone_result = await  check_phone_on_DB(phone);
    let message; 
    if(phone_result){
        console.log(`name ${username} email ${email} phone ${phone} password ${req.body.password} passhash ${passhash}`);
         await Add_user_on_DB(username, email, phone , passhash );
        message ="data is Created";
    }else{
        message = " You Can't";
    }
    res.send(message);
});
userRoute.get('/us',(req, res) =>{
    res.send("user");
});



module.exports = userRoute;