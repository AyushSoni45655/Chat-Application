

import React, { useContext, useRef, useState, useEffect } from "react";
import { IoArrowBackSharp, IoSendOutline } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { Contextt } from "../Context/AppContext";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "../componants/SenderMessage";
import ReciverMessage from "../componants/ReciverMessage";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Socket } from "socket.io-client";
const Chats = () => {
const navigator = useNavigate()
  const backend_Url = import.meta.env.VITE_BACKEND_URL || "https://chat-backend-3jzz.onrender.com";
 
  const [isTyping,setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const { setIsChatOpen, partnerTyping,allUsers,user,socketId,setSocketId,setReceiverId} = useContext(Contextt);
  const { id } = useParams();
setReceiverId(id);
   const myUser = allUsers.find((user) => id === user._id);

  const [messageData, setMessageData] = useState({
    image: "",
    content: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const chatEndRef = useRef(null);
const typingTimeOutRef = useRef(null);
  const messageOnChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setMessageData((prev) => ({ ...prev, [name]: file }));
      }
    } else {
      setMessageData((prev) => ({ ...prev, [name]: value }));
      if(!isTyping){
        setIsTyping(true);
        socketId.emit('typing',{userId:user.id,receiverId:id})
      }
      if(typingTimeOutRef.current) clearTimeout(typingTimeOutRef.current);
      typingTimeOutRef.current = setTimeout(() => {
        setIsTyping(false);
        socketId.emit('stopTyping',{userId:user.id,receiverId:id})
      }, 1200);
    }
  };

  const messageOnSubmit = (e) => {
    e.preventDefault();
   sendMessages();
  };

  const onEmojiClick = (emojiData) => {
    setMessageData((prev) => ({
      ...prev,
      content: prev.content + emojiData.emoji,
    }));
    setShowEmoji(false)
  };

  // Auto scroll bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);
  const [messages,setMessage] = useState(JSON.parse(localStorage.getItem('message')) || []);
  const senderId = user?.id;
const receiverId = id;
  const getMessagesFromBackend = async () => {
  try {
    if (!senderId || !receiverId) return toast.error("Invalid user info");
    const response = await axios.post(`${backend_Url}/api/message/get`, {
      sender: senderId,
      receiver: receiverId,
    });
    if (response.data.success) {
      setMessage(response.data.messages);
      localStorage.setItem("message", JSON.stringify(response.data.messages));
    } else toast.error(response.data.msg);
  } catch (error) {
    console.log(error);
    // toast.error(error.response?.data?.msg || "Server error");
  }
};
  
  useEffect(() => {
  getMessagesFromBackend()
}, []);

const  goBack   = ()=>{
setIsChatOpen(false);
navigator("/")
}
useEffect(() => {
  if (!socketId) return;

  const handleNewMessage = (msg) => {
    setMessage((prevMessages) => [...prevMessages, msg]);
  };

  socketId.on("newMessage", handleNewMessage);

  return () => {
    socketId.off("newMessage", handleNewMessage);
  };
}, [socketId]);


 const { image, content } = messageData;

 
const sendMessages = async () => {
  try {
    const formData = new FormData();
    formData.append("sender", senderId);
    formData.append("reciver", receiverId);
    formData.append('image', image);
    formData.append('message',content);

    const response = await axios.post(`${backend_Url}/api/message/send`,formData);

    if (response.data.success) {
      // toast.success("Message sent");
      setMessageData({ image: "", content: "" });
      setImagePreview(null);
      
    } else {
      toast.error(response.data.msg);
    }
  } catch (e) {
    console.error(e);
    toast.error(e.response?.data?.msg || "Server error");
  }
};



  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="w-full flex items-center gap-4 px-4 py-3 bg-[#435ffe] shadow-md sticky top-0 z-20">
        <button
          onClick={() => goBack()}
          className="text-white hover:scale-110 transition-transform"
        >
          <IoArrowBackSharp className="text-2xl sm:text-3xl" />
        </button>

        <div className="flex items-center gap-3 truncate">
          <img
            src={myUser?.image || "/default-user.png"}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
            alt="User"
          />
          <div className="truncate">
            <h2 className="text-white font-semibold text-base sm:text-lg truncate">
              {myUser?.name || "Unknown User"}
            </h2>
            {
              partnerTyping && (

                 <p className="text-gray-200 text-sm sm:text-base truncate">
            Typing...
            </p>
              )
            }
           
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 bg-linear-to-b from-gray-50 to-gray-200 relative">
        <div className="flex flex-col gap-3 max-w-[90%] mx-auto pb-24">
    
          
          {
  messages.map((msg, index) => {
    // अगर message valid है (sender और receiver match करते हैं)
    if (
      (msg.sender === senderId && msg.receiver === receiverId) ||
      (msg.sender === receiverId && msg.receiver === senderId)
    ) {
      // अगर current user ने message भेजा है
      if (msg.sender === senderId) {
        return <SenderMessage key={index} message={msg} />;
      } else {
        return <ReciverMessage key={index} message={msg} receiver={myUser} />;
      }
    }
    return null;
  })
}

          {imagePreview && (
            <div className="relative w-28 sm:w-32 h-28 sm:h-32 rounded-lg overflow-hidden shadow-md">
              <img
                src={imagePreview}
                className="w-full h-full object-cover"
                alt="Preview"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-1 right-1 bg-white/80 hover:bg-white p-1 rounded-full"
              >
                <RxCross1 className="text-red-600 text-sm" />
              </button>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Emoji Picker */}
        {showEmoji && (
          <div className="absolute bottom-20 left-2 sm:left-4 z-30 animate-fade-in">
            <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="w-full bg-white border-t border-gray-300 px-3 py-2 sticky bottom-0 shadow-md">
        <form
          onSubmit={messageOnSubmit}
          className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#435ffe] transition"
        >
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmoji((prev) => !prev)}
            className="text-[#435ffe] hover:bg-blue-100 p-2 rounded-full transition"
          >
            <RiEmojiStickerLine className="text-xl sm:text-2xl" />
          </button>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Type a message..."
            value={messageData.content}
            onChange={messageOnChange}
            name="content"
            className="flex-1 bg-transparent outline-none text-gray-800 text-sm sm:text-base placeholder-gray-400"
          />

          {/* Image Upload */}
          <label
            htmlFor="image"
            className="cursor-pointer text-[#435ffe] hover:bg-blue-100 p-2 rounded-full transition"
          >
            <FaRegImages className="text-xl sm:text-2xl" />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={messageOnChange}
          />

          {/* Send Button */}
          <button
            type="submit"
           
            className="bg-[#435ffe] hover:bg-[#3048d6] p-2 rounded-full text-white transition"
          >
            <IoSendOutline className="text-lg sm:text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
