import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    required:true,
    type:String
  },
   userName:{
    unique:true,
    type:String,
    default:""
  },
   email:{
    unique:true,
    required:true,
    type:String
  },
   password:{
    required:true,
    type:String
  },
   image:{
    type:String,
    default:""
  }

},{timestamps:true});

const UserModel = mongoose.models.User || mongoose.model('User',userSchema,'users');
export default UserModel;