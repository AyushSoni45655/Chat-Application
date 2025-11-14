import imagekit from "../config/imagekit.js";
import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";
import fs from 'fs';
import { getReciverSocketId, io } from "../socket/socket.js";


const sendMessage = async (req, res) => {
  try {
    const { sender, reciver, message } = req.body;

    // 🧩 Validation
    if (!sender || !reciver || (!message && !req.file)) {
      return res
        .status(400)
        .json({ success: false, msg: "Input missing (sender, receiver, or message)" });
    }

    // 🖼️ Optional Image Upload
    let optimizedImage = null;
    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);

      const uploadResponse = await imagekit.upload({
        fileName: req.file.originalname,
        file: imageBuffer,
        folder: "/pingMe-chatImage",
      });

      optimizedImage = imagekit.url({
        src: uploadResponse.url,
        transformation: [
          { quality: "auto" },
          { width: "1280" },
          { format: "webp" },
        ],
      });

      // Delete temp file
      fs.unlinkSync(req.file.path);
    }

    // 🗂️ Check if conversation exists
    let conversation = await ConversationModel.findOne({
      participants: { $all: [sender, reciver] },
    });

    // 🆕 Create conversation if not exists
    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [sender, reciver],
      });
    }

    // 💬 Create new message
    const newMessage = await MessageModel.create({
      sender,
      receiver: reciver, // ✅ spelling fix (if your schema field is receiver)
      content: message || "",
      image: optimizedImage || "",
      conversationId: conversation._id,
    });
    const receiverSocketId = getReciverSocketId(reciver);
    const senderSocketId = getReciverSocketId(sender);
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage',newMessage)
    }
    if(senderSocketId){
      io.to(senderSocketId).emit("newMessage",newMessage)
    }

    // 🔁 Update conversation with last message
    conversation.messages.push(newMessage._id)
    conversation.lastMessage = newMessage._id;
    await conversation.save();

    // ✅ Return success response
    return res
      .status(201)
      .json({ success: true, msg: "Message sent successfully", message: newMessage });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, msg: e.message });
  }
};


const getMessages = async(req,res)=>{
  try{
    const {sender,receiver} = req.body;
    if(!sender || !receiver){
      return res.status(400).json({success:false,msg:"Input is missing"});
    }
    const conversation = await ConversationModel.findOne({
      participants:{$all:[sender,receiver]}
    }).populate('messages');
    if(!conversation){
      return res.status(400).json({success:false,msg:""});
    }
     res.status(200).json({success:true,msg:'Converstion is found !',messages:conversation.messages})

  }catch(e){
    console.log(e);
     res.status(500).json({success:false,msg:e.message});
    
  }
}

export {
  sendMessage,getMessages
}