
import mongoose from "mongoose";

async function mymongodbConnection(url) {
    try{
        const myconnection =  await mongoose.connect(url,{serverSelectionTimeoutMS:1000});
    
    }catch(error){
         console.error('MongoDB connection failed:', error.message);
        

}


}
export{ 
    mymongodbConnection,
    mongoose
};
