import {mongoose} from "../connection/connect.js";

 const myShcema = new mongoose.Schema({
     userName:{
         required:true,
         type:String,
         trim:true
     },
     email:{
         required:true,
         type:String,
         unique:true,
         lowercase:true
     },
      password:{
        required:true,
        type:String
    },
     role:{
         type:String,
         enum:['user'],
          default: 'user'
     },
     createdAt:{
         type:Date,
         default:Date.now()
     }
  })

  const usermodel = mongoose.model("user",myShcema)

export{usermodel}