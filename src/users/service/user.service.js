const  userModel = require('../schema/user.schema');
const otpModel = require('../../otp/schema/otp.schema');
const bcrypt = require('bcrypt');
const validator = require('email-syntax-validator');

module.exports = {
    checkuser: async (userMail) =>{
        return await userModel.findOne({email: userMail});
    },
    checkphone: async (userPhone) => {
        return await userModel.findOne({phone: userPhone});
    },
    checkphoneVerify: async (phone) => {
        const verifyresult = await otpModel.findOne({phone: phone});
        return verifyresult;
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
        return useradd._id;
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
        const userData = await userModel.findById(uid);
        const hash = userData.password;
        const oldresult = bcrypt.compareSync(oldpassword,hash);
        return oldresult;
    },
    updatePassword: async (uid, newpassword) =>{
        const hashpassword = await bcrypt(newpassword, 10);
        await userModel.findByIdAndUpdate({_id:uid},{password:hashpassword});
    }
};