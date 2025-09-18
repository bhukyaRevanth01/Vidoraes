import { mongoose } from "../connection/connect.js"


 const mySchema =new mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        unique:true
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
        enum:['admin'],
        default:'admin'
       
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
 })
 const adminModel = mongoose.model("admin",mySchema);

 export{
    adminModel
 }