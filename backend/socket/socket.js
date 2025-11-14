import http from 'http';
import express from 'express';
const app = express();
import { Server } from 'socket.io';
const server = http.createServer(app);
export const io = new Server(server,{
  cors:{
    origin:process.env.FRONTEND_URL
  }
});
export const userSocketMap = {}
export const getReciverSocketId = (reciever) =>{
  return userSocketMap[reciever]
}
io.on('connection',(socket)=>{
  const userId = socket.handshake.query.userId;
  const receiverId = socket.handshake.query.receiverId;
  console.log(userId,receiverId);
  
  
  
  if(userId){
    userSocketMap[userId] = socket.id;
  }
 
  io.emit('getOnlineUser',Object.keys(userSocketMap));

  
  // typing implementation here
  socket.on("typing",({userId,receiverId})=>{
    const recieverSocketId = userSocketMap[receiverId];
    if(recieverSocketId){
      io.to(recieverSocketId).emit('userTyping',{senderId:userId})
    }
  })

  // stop typing
  socket.on("stopTyping",({userId,receiverId})=>{
    const receiverSocketId = userSocketMap[receiverId];
    if(receiverSocketId){
      io.to(receiverSocketId).emit("userStopTyping",{senderId:userId})
    }
  });
  
  socket.on('disconnect',()=>{
    delete userSocketMap[userId]
     io.emit("getOnlineUser",Object.keys(userSocketMap))
  })


})
export {
  app,server
}