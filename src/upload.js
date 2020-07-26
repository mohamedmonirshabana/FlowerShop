const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,  path.resolve("uploads"));
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-'+Math.round(Math.random() * 1E9 );
        const exten = file.originalname.split('.')[1];
        cb(null, file.fieldname + '-'+ uniqueSuffix+'.'+exten);
    }
});

const upload = multer({storage: storage});

module.exports  = upload;