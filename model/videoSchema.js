import {mongoose} from "../connection/connect.js"

const vidoeSchema = new mongoose.Schema({

    title:String,

    description:String,

    category:String,

restriction:String,
     
    email:String,
    
    url:String,
   
    uploadedAt:{type:Date,
        default:Date.now()
    }
})
const videoModel =  mongoose.model('MyFiles',vidoeSchema)

export{videoModel}