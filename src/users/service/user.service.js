const  userModel = require('../schema/user.schema');
const otpModel = require('../../otp/schema/otp.schema');
const bcrypt = require('bcrypt');
const validator = require('email-syntax-validator');

module.exports = {
    checkuser: async (userMail,userPhone) =>{
        return await userModel.findOne({$and:[{email:userMail}, {phone:userPhone}]});

    },
    checkphoneVerify: async (phone) => {
        const verifyresult = await otpModel.findOne({phone: phone});
        return  verifyresult.verify;
    },
    AddUser: async(name,email,phone,password,photo) =>{
        const hashpass= bcrypt.hashSync(password,10);
        const useradd = await userModel.create({
            name: name,
            email: email,
            phone: phone,
            password: hashpass,
            profilepics:photo
        });
        return await useradd._id;
    },
    loginuser: async(username, pass) =>{
        if(validator.validate(username)){
        const getuser = await userModel.findOne({email: username});
        const hash = getuser.password;
        const result = bcrypt.compareSync(pass, hash);
        return result;
        }else{
            const getuser = await userModel.findOne({phone: username});
        const hash = getuser.password;
        const result = bcrypt.compareSync(pass, hash);
        return result;
        }
    },
    getuserID: async (mailphone) =>{
        if(validator.validate(mailphone)){
            const user = await userModel.findOne({email: mailphone});
            return user._id;
        }else{
            const user = await userModel.findOne({phone: mailphone});
            return user._id;
        }
    },
    updateuser: async (uid,name, email, photo) => {
        await userModel.findByIdAndUpdate({
            _id: uid
        },{
            email: email,
            name: name,
            profilepics: photo
        });
    },
    checkPassword: async (uid, oldpassword) => {
        console.log('clickableFk',oldpassword);
        const userData = await userModel.findOne({_id:uid});
        const hash = userData.password;
        const result = bcrypt.compareSync(oldpassword,hash);
        return result;
    },
    updatePassword: async (uid, newpassword) =>{
        const hashpassword = await bcrypt.hashSync(newpassword, 10);
        await userModel.findByIdAndUpdate({_id:uid},{password:hashpassword});
    },
    getuserData: async(userID) =>{
        const userData = await userModel.findOne({_id:userID},{_id:false, password:false});
        return userData;
    }
};