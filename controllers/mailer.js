import nodemailer  from 'nodemailer'
import jwt  from 'jsonwebtoken'
import {otpModel} from '../model/otp.js'

 
 async function clientOtpReceiver(req,res) {
   console.log(req.body)
try {
  console.log("ROLE:",req.body.role)
    const {email,role,otp} = req.body
     console.log(email)
   const Token = jwt.sign({email:email,role:role},process.env.REACT_APP_my_Secret_key)
    
if(Token && email){
const dataGetting = await  otpModel.findOne({email:email})
 console.log("eeeeeee",dataGetting)
 if(dataGetting){
       const checkingotp = dataGetting.otp == otp
       if(checkingotp){
       res.status(200).json({token:Token,role:role})
       
       }
 }else{
  res.status(404).json('OTP expired try again')
 }}

} catch (error) {
  console.log('error at otpoperation : ',error)
}
   

    
 }

  async function sendMailer(email) {
    const otp = ((Math.floor(100000+Math.random()*900000)))


    if(email && otp){
       console.log("emails : ",email)
        try{ 
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: "bhukyarevanthnayak@gmail.com", 
        pass: "zjqx apem snof fyqj", 
      },
    });
   
    



    (async () => {
      
      try {
        
        const info = await transporter.sendMail({
          from:' "no-reply "<bhukyarevanthnayak@gmail.com>',
          to:email,  
          subject: "OTP",
          text: "Dear User", 
          html: `
    Your One-Time Password (OTP) for verification is ${otp}.
    Please use this code within the next 5 minutes to complete your process.
    For your security, do not share this OTP with anyone
    Thank you,
    ` 
        });

     async function otpNoter() {

if(email){
  const obtainData = await otpModel.findOne({email:email})
  if(!obtainData){
        try{
     const gettingData = await otpModel.create(
      {email:email,
      otp:otp,
      CreatedAt:new Date(Date.now() + 5 * 60 * 1000)
      
    })
      console.log('data creatyed at :- ',gettingData)
    }catch(error){
        console.log(error)
    }
  }else{
     const DeletedData = await otpModel.deleteOne({email:email})
     if(DeletedData){
         try{
     const gettingData = await otpModel.create(
      {email:email,
      otp:otp,
      CreatedAt:new Date(Date.now() + 5 * 60 * 1000)
      
    })
      console.log('data creatyed at :- ',info.accepted)
    }catch(error){
        console.log(error)
    }
     }
  }
}
   
 } otpNoter()
  
      } catch (error) {
        console.error(" Error sending email:", error);
      }
    })();
   
}catch(error){
    console.log(error)
}
    }
    
  }
  export{
    clientOtpReceiver,
    sendMailer
  }