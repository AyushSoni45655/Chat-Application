import mongoose from "mongoose";

const connectDB = async()=>{
  try{

       mongoose.connection.on("connected", ()=>{
    console.log("Mongodb connected successfully");
    
   });
   mongoose.connection.on("error", (error)=>{
    console.log("Connection failed of mongodb due to some reson!!!",error);
   });

   await mongoose.connect(process.env.MONGODB_URI,{
    dbName:'Chats',
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });

  }catch(e){
        console.error("⚠️ Something went wrong while connecting to MongoDB:", e);
    process.exit(1); // यदि कनेक्शन fail हो जाए तो process रोक देना
  }


}

export default connectDB;