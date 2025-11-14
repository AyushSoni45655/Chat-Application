import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  ],
  messages:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Message'
    }
  ],
  lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
},{timestamps:true});

const ConversationModel = mongoose.models.Conversation || mongoose.model('Conversation',conversationSchema,'conversations');

export default ConversationModel;