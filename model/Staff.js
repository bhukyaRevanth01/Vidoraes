import {mongoose} from "../connection/connect.js"


 const mySchema =new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,

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
        enum:['staff'],
        default:'staff'
    },
    image: {
    data: Buffer,        
    contentType: String, 
  },
    userName:{
        required:true,
        type:String,
        trim:true,

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
 })
 const staffModel = mongoose.model("staff",mySchema);

 export{staffModel}