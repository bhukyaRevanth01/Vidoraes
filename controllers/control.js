
import  dotenv from "dotenv"
import {videoModel} from"../model/videoSchema.js"
import path from "path";
import fs  from "fs";
import { v4 as uuid } from 'uuid';
import {staffModel} from '../model/Staff.js'
import {adminModel} from '../model/Admin.js'
import {usermodel} from '../model/user.js'
import jwt  from 'jsonwebtoken'
import {sendMailer} from '../controllers/mailer.js'




const pub = 'publice'
const pvt = 'private'


dotenv.config();

 
//  profile data update of user admin staff
async function handlestaffUpdate(req,res) {
const name=req.body[0].name
 const id =req.body[1]

  try{
    const updateOne = await staffModel.updateOne({_id:id},{$set:{userName:name}})
    
  if(updateOne){
    console.log(updateOne)
  res.json(updateOne)
  }else{
    console.log('error at update profile of stafff')
  }
  }catch(error){
    console.log(error)
  }
}



// profile data of user admin staff
async function handleUserData(req,res){
  const gettingData = req.body
  console.log('geeeeeeeeeeee',gettingData)
 try {
    if(gettingData.role === "user"){
        const obtainData = await usermodel.findOne({email:gettingData.email})
       console.log("obtain : ",obtainData)

       if(!obtainData){
        console.log('i am here')
        return res.status(404).json({error:'user not founded'})
        
       }
        if(obtainData.password !== gettingData.password){
          console.log('i am here2')
          return res.status(401).json({error:'not matched pass'})
        }
        res.status(200).json(obtainData)
        console.log('fffffffffff',obtainData)
   }
 } catch (error) {
   console.log(error)
 }
}
async function handleAdmindata(req,res){
 const gettingData = req.body
 try {
  if(gettingData.role === 'admin'){
        const obtainData = await adminModel.findOne({email:gettingData.email})
       console.log("obtain : ",obtainData)

       if(!obtainData){
        console.log('i am here')
        return res.status(404).json({error:'user not founded'})
        
       }
        if(obtainData.password !== gettingData.password){
          console.log('i am here2')
          return res.status(401).json({error:'not matched pass'})
        }
        res.status(200).json(obtainData)
        console.log('cccccc',obtainData)
   }
 } catch (error) {
  console.log(error)
 }
}
async function handleStaffData(req,res){
 const gettingData = req.body
  console.log ( "at staff ",gettingData)
try{ 
    if(gettingData.role === "staff"){
        const obtainData = await staffModel.findOne({email:gettingData.email})
      console.log(obtainData.role)

       if(!obtainData){
        console.log('i am here')
        return res.status(404).json({error:'user not founded'})
        
       }
       
       if(obtainData){
         res.status(200).json(obtainData)
       }
   
   }
}catch(error){
  console.log({'error':error})
  res.status(400).json(error)
}
}



//  singin user admin staff
async function handlingsinginUser(req,res) {
    const gettingData = req.body
  console.log('here :',gettingData)

 try{ 
   if(gettingData){
    const Token = jwt.sign({email:gettingData.singinEmail,password:gettingData.singinPassword,role:gettingData.singinRole},process.env.REACT_APP_my_Secret_key)
        const obtainData = await usermodel.findOne({email:gettingData.singinEmail})
       console.log("obtain : ",obtainData)
    if(!obtainData){
      return res.status(404).json({error:'user not founded'})
    };
    if(obtainData.password !==gettingData.singinPassword){
      return res.status(401).json({message:"invalid password"})
    }
    sendMailer(obtainData.email )
    res.status(200).json(Token)
     }
     else{
      console.log(`staffgmail is ${gettingData.gmail}`)
    }} catch (error) {
     console.log("error at get singin all")
     res.status(500).json("error at singin method")
  }



}
async function handlingsinginAdmin(req,res) {
    const gettingData = req.body
 console.log(gettingData)
 try{ 
   if(gettingData){
     const Token = jwt.sign({email:gettingData.singinEmail,password:gettingData.singinPassword,role:gettingData.singinRole},process.env.REACT_APP_my_Secret_key)
        const obtainData = await adminModel.findOne({email:gettingData.singinEmail})
       console.log("obtain : ",obtainData)
    if(!obtainData){
      return res.status(404).json({error:'user not founded'})
    };
    if(obtainData.password !==gettingData.singinPassword){
      return res.status(401).json({message:"invalid password"})
    }
    sendMailer(obtainData.email, )
    res.json(Token)
     }
     else{
      console.log(`staffgmail is ${gettingData.gmail}`)
    }} catch (error) {
     console.log("error at get singin all")
     res.status(500).json("error at singin method")
  }
}
async function handlingsinginStaff(req,res) {
    const gettingData = req.body
   console.log(gettingData)
  try {
  
  
   if(gettingData){
        const obtainData = await staffModel.findOne({email:gettingData.email})
       
        
    if(!obtainData.email && !obtainData){
      return res.status(404).json({error:'user not founded'})
    };
    if(obtainData.password !==gettingData.password){
      return res.status(401).json({message:"invalid password"})
    }

    sendMailer(obtainData.email)
    
    res.json(obtainData)
     }else{
      console.log(`staffgmail is :- ${gettingData.email}`)
    }} catch (error) {
     console.log("error at get singin all",error)
     res.status(500).json("smothinWent wrong")
  }
}


// singup user admin staff
async function handlingSingupUser(req,res){
  const gettingData = req.body
 console.log("user",gettingData.email)
try{ 
    if(gettingData){
     const sendingData = await usermodel.create(gettingData)
      if(sendingData){
         sendMailer(gettingData.email )
       res.json(sendingData)
      }
    }
     
}catch(err){
 if(err.code ===1100){
  console.error('error at Asu method');
  res.status(405).json('email already exist')
 }
} 
  
} 
async function handlingSingupAdmin(req,res) {
  const gettingData = req.body
  const mychecking = await adminModel.findOne({role:gettingData.role})
      if(mychecking === null){
        const Token = jwt.sign({email:gettingData.email,password:gettingData.password,role:gettingData.role},process.env.REACT_APP_my_Secret_key)
        const  adminInfo = await adminModel.create(gettingData)
        console.log('uploaded : ', Token)
        sendMailer(adminInfo.email)
        res.json(Token)
        }else{
        console.log('admin already exist')
        res.status(405).json("you not allowed")      }
};
async function handlingSingupStaff(req,res){

  // 
  const gettingData = req.body
 
try{ 
    if(gettingData && gettingData.role === "staff"){
     console.log(req.file)
        if (!req.body.email) {
  return res.status(400).json({ message: "Email is required" });
       }else {
          try {
       const sendingData = await staffModel.create(gettingData)
      
       if(req.file){
        console.log(' file doc')
        const storefile = fs.readFileSync(req.file.path)

         const gettingimage = {data:storefile,contentType:req.file.mimetype}
       
       if( gettingimage){
    try {
      
const obtainedata = await staffModel.findOneAndUpdate(
  { email:gettingData.email},
  { $set: { image: gettingimage } },
  { new: true }
);

    
    } catch (error) {
      console.log(error)
    }
  }

  } 

        sendMailer(gettingData.email)
       res.status(200).json(sendingData)
     console.log('submitted')
    } catch (error) {
       res.status(405).json('email already exist')
      console.log(error)
    } }
    }else{
      console.log('data not reached here')
    }
  }catch(err){
 if(err.code ===1100){
  console.error('error at Asu method');
   res.status(405).json('email already exist')
 }
} 

}



//  video posth method
async function handlingUploads(req, res) {
  const mydata = req.file.buffer;
  const body = { ...req.body };
  console.log("body",body)
  if (!mydata) {
    console.log("file is not reached here");
  }
   const checkingEmail =  await staffModel.find({email:body.email})
  if(checkingEmail) { 
  try {
    const filePath = path.join("uploads/", `${uuid()}.Mp4`);
     fs.writeFileSync(filePath, mydata);
    try {
     
       const result = await new Promise((resolve,reject)=>{
          cloudinary.uploader.upload_large(filePath,{
          resource_type:'video',
          folder:'videos',
           sign_url: true,
           type: "authenticated",
          chunk_size:35000000,
            timeout: 600000 
         
         },(error,result)=>{
          if(error){
            reject(new Error('error at large file: ' + error.message));
            console.log(error)
          }else{
            resolve(result);
          }
         })
      })
          console.log('checkij' , body.restriction)
       await videoModel.create({
        uploadedAt:new Date(),
        title:body.title,
        description:body.description,
        category:body.category,
        restriction:body.restriction,
        email:body.email,
        url:result.secure_url

       })
        fs.unlinkSync(filePath);
    } catch (error) {
      fs.unlinkSync(filePath);
      console.log(error);
     
    }
  } finally {
    console.log("uploaded finished");
   
  }
}
}

//  all video tp home page
async function handlingStream(req, res) {
  try {
    const videos = await videoModel.aggregate([{$match:{restriction:pub}}]).sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (error) {
    res.json({ message: "error at handleStream" });
  }
}

// creater videos  
async function handlingSpecficVideo (req,res){
 const gettingData = req.body
try {
  
   if(gettingData){
  const video= await videoModel.find({email:gettingData.email}).sort({uploadedAt:-1})
   
   res.json(video)
 }

} catch (error) {
   console.log(error)
   res.status(404).json({myFiles:error})
}
}

// publice videos
async function handleStreamPublice(req,res,){
  const gettingData = req.body

if(gettingData){
  const obtainedData = await videoModel.findOne({email:gettingData.email,restriction:pub})
  console.log("at obt publice : ",obtainedData)
  if(obtainedData){
    try {
  const video= await videoModel.aggregate([{ $match:{restriction:pub ,email:gettingData.email} }]).sort({uploadedAt:-1})
   res.json(video)
 
} catch (error) {
   console.log(error)
   res.status(404).json({myFiles:error})
}

  }else if(!obtainedData){
        console.log('public video got error')
    res.json({message:"not founded"})
  }
}else{
  res.status(500).json('data not reached ')
}
}

//  private video
async function handleStreamPrivate(req,res){
  const gettingData = req.body

if(gettingData){
  const obtainedData = await videoModel.findOne({email:gettingData.email,restriction:pvt})

  if(obtainedData ){
     console.log("at obt pvt " ,obtainedData)

    try {
  const video= await videoModel.aggregate([{$match:{restriction:pvt,email:gettingData.email}}]).sort({uploadedAt:-1})
   res.json(video)

} catch (error) {
   console.log(error)
   res.status(404).json({myFiles:error})
}

  }else if(!obtainedData){
    console.log('privat video got error')
 res.json({message:"not founded"})
  }
}else{
  res.status(500).json('data not reached ')
}
}


//  handle private paused
async function  handlePrivate(req,res){
console.log('private')
console.log("wfwwew : ",req.body)
 console.log(req.params.id)
  const retrvingData = await videoModel.updateOne({_id:req.params.id},{$set:{restriction:pvt}})
    console.log('reached here !!')
if(retrvingData){
  res.json(retrvingData)
}else{
  console.log('private faild')
}
}
//  handle publice paused
async function  handlePublice(req,res){
console.log('publice')
 console.log(req.params.id)
  const retrvingData = await videoModel.updateOne({_id:req.params.id},{$set:{restriction:pub}})
  console.log('reached here !!')
if(retrvingData){
   res.json(retrvingData)
}else{
  console.log('private faild')
}
}

async function handlingSearch(req,res) {
   const gettingData = req.body[0]
  

}

async function handleingimage(req,res) {
 const {email} = req.body

 if(req.file) { 

    const checcking = fs.readFileSync(req.file.path)

     const gettingimage = {data:checcking,
                         contentType:req.file.mimetype,
 }
  if( gettingimage){
    try {
      
const obtainedata = await staffModel.findOneAndUpdate(
  { email:email},
  { $set: { image: gettingimage } },
  { new: true }
);
  res.json('saved')
    
    } catch (error) {
      console.log(error)
    }
  }
  

}
}


export{
  handlestaffUpdate,

 handleAdmindata,
 handleStaffData,
 handleUserData,

 handlingUploads,
 handlingStream,
 handlingSpecficVideo,
handlePrivate,
handlePublice,
handleStreamPublice,
handleStreamPrivate,


 handlingSingupAdmin,
 handlingSingupStaff,
 handlingSingupUser,

 handlingsinginAdmin,
 handlingsinginStaff,
 handlingsinginUser,

 handlingSearch,
 handleingimage
};
