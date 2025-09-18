

import dotenv from "dotenv"
import {videoModel} from "../model/videoSchema.js"
import path from "path"
import fs from  "fs"
import {staffModel} from '../model/Staff.js'
import {adminModel} from '../model/Admin.js'
import {usermodel} from '../model/user.js'
import jwt  from 'jsonwebtoken'
import {sendMailer} from './mailer.js'


dotenv.config()


async function imageSendertoStaff(req,res) {
const {email} = req.body
 console.log('email : ',email)
try {
    if(email){
   const obtainData =   await staffModel.findOne({email:email})
   if(!obtainData){
    res.status(404).json("not founded")
   }else if(obtainData){
     console.log('datagettting:',obtainData.email)
     const imgaChangerBuffer = obtainData.image?.data
     const storeimage = imgaChangerBuffer.toString('base64')
      
     res.json(
      {image:`data:${obtainData.image.contentType};base64,${storeimage}`})
   }
}else{
res.json('error try after some times')
}
} catch (error) {
   console.log('error at imageSender ',error) 
}
}



export{
    imageSendertoStaff
}