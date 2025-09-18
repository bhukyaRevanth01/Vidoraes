import dotenv  from "dotenv"
import {videoModel}  from "../model/videoSchema.js"
import path from "path"
import fs from "fs"
import {staffModel} from '../model/Staff.js'
import {adminModel} from '../model/Admin.js'
import {usermodel} from '../model/user.js'
import jwt  from 'jsonwebtoken'
import {sendMailer} from '../controllers/mailer.js'
import *as Bytescale from '@bytescale/sdk'
import nodeFetch from 'node-fetch'
// jump share 

 const uploadDetails = new Bytescale.UploadManager({
    fetchApi:nodeFetch,
    apiKey:"public_W23MTMPFvPYr3jCVGX7Qqp84rVNB"
 })
  


async function handlinguplodvideo(req,res) {
   if(req.file){
     console.log('i am reached here')
    console.log(req.file)
     uploadDetails.upload({
    data:req.file?.buffer,
    mime:req.file?.mimetype,
    originalFileName:req.file.originalname

})
.then(({fileUrl,filePath})=>{
    console.log("URL:",fileUrl)
    console.log("PATH:",filePath)
})
.catch((error)=>console.log("error at jumpShare:",error))
   res.json({message:'data reached here'})
   }

}
export{handlinguplodvideo}