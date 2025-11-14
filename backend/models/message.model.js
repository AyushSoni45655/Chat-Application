import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  conversationId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Conversation",
    required:true
  },
  isRead:{
    type:Boolean,
    default:false,
  },
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  
  receiver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  
  content:{
    type:String,
    required:false,
    default:""
  },
   image:{
    type:String,
    required:false,
    default:""
  },
},{timestamps:true});

const MessageModel = mongoose.models.Message || mongoose.model('Message',messageSchema,'messages');
export default MessageModel;