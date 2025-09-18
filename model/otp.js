import  {mongoose}  from"../connection/connect.js"

const otpSchema = new  mongoose.Schema({

    email:{
        type:String
    },
    otp:{
        type:Number
    },
    CreatedAt:{
        type:Date,
        default:Date.now(),
       expires:0
        
    }
})

 const otpModel =  mongoose.model('otpSaver',otpSchema)


export  {
    otpModel
 }
