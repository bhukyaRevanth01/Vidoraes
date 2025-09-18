import express from 'express';
import multer from 'multer'
 import {handlinguplodvideo}  from '../controllers/videoControl.js'
 import{imageSendertoStaff}  from './../controllers/smallController.js'

import{
      handlestaffUpdate,

    handleAdmindata,
    handleStaffData,
    handleUserData,
    
    handlingStream,
    handlingUploads,
    handlingSpecficVideo,
    handlePrivate,
    handlePublice,
    handleStreamPrivate,
    handleStreamPublice,

    
    handlingSingupAdmin,
    handlingSingupStaff,
    handlingSingupUser,

    handlingsinginAdmin,
    handlingsinginStaff,
    handlingsinginUser,

    handlingSearch,
    handleingimage
    
    
} from '../controllers/control.js';
import { tokenWare,Adminware,Userware,controlVideoprvtPub }  from '../controllers/middleware.js'
import  { clientOtpReceiver }  from '../controllers/mailer.js';

const route = express.Router()
const mystore = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },filename:function(){
          const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName)
    }
}) 
const upload = multer(mystore)
const imagefile = multer({dest:'uploads/' })

route.post('/otpSender',clientOtpReceiver)

route.post('/updateProfileStaff',handlestaffUpdate)

route.get('/profileAdmin',Adminware,handleAdmindata)
route.get('/profileStaff',tokenWare,handleStaffData)
route.get('/profileUser',Userware,handleUserData)

route.post("/siginadmin",handlingsinginAdmin)
route.post("/loginStaff",handlingsinginStaff)
route.post('/siginUser',handlingsinginUser)

route.post('/admin',handlingSingupAdmin)
route.post("/staff",imagefile.single('pic'),handlingSingupStaff)
route.post("/user",handlingSingupUser)

route.post("/uploads",handlingUploads);
route.post("/videoupload",upload.single('video'),handlinguplodvideo);
route.get("/files",handlingStream)
route.get("/myfiles",tokenWare,handlingSpecficVideo)

route.get('/private',controlVideoprvtPub,handleStreamPrivate)
route.get('/publice',controlVideoprvtPub,handleStreamPublice)

route.post('/private/:id',handlePrivate)
route.post('/publice/:id',handlePublice)


route.post('/search',handlingSearch)
route.post('/uploadedimages', imagefile.single('image'),handleingimage) 
route.get('/imageGetter',tokenWare,imageSendertoStaff)




export{route}

