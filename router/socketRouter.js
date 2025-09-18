import  {adminModel} from '../model/Admin.js'
import  {staffModel} from '../model/Staff.js'
import  {usermodel}  from '../model/user.js'
import  {videoModel}  from '../model/videoSchema.js'


const isPublic = 'publice'
const isPrivate = 'private'




 function socketStore  (io){

 
    io.on('connection',(socket)=>{

     
     
      socket.on('public',(async(data)=>{
        const gettingData = await videoModel.updateOne({_id:data},{$set:{restriction:isPublic}})
        
    }))  

      socket.on('private',(async(data)=>{
        const gettingData = await videoModel.updateOne({_id:data},{$set:{restriction:isPrivate}})
        
      }))

//  socket.on("search",(async(data)=>{
//   console.log("checking : -",data)
//  }))

    
})

}

export {socketStore}