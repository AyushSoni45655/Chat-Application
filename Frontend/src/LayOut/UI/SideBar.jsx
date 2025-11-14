


import React, { useState } from "react";
import { useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { Contextt } from "../../Context/AppContext";


const SideBar = ({onChatSelect}) => {
  const [searchWidth,setSearchWidth] = useState(false);
  const {user,logout,allUsers,onlineUsers} = useContext(Contextt);
  const [searchUser,setsearchUser] = useState("");

  const filteruser = ()=>{
    if(!searchUser.trim())return allUsers;
    
      return allUsers.filter((user)=> user.name.toLowerCase().startsWith(searchUser.toLowerCase()))
    
  }
  
  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* 🌈 Top Section */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white h-[26vh] md:h-[28vh] rounded-br-[30%] shadow-md flex flex-col justify-around pb-3">
        {/* Header */}
        <div className="flex justify-between items-center px-5 pt-5">
          <div>
            <h2 className="font-extrabold text-2xl md:text-3xl tracking-wide">
              pingMe<span className="text-yellow-300">.</span>
            </h2>
            <p className="text-sm md:text-lg font-medium text-white/90">
              Hi, <span className="font-semibold">{user.name}👋</span>
            </p>
          </div>

          <div className="h-12 w-12 rounded-full border-2 border-white shadow-md overflow-hidden">
            <img
              src={user.image}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
        </div>

        {/* Search Bar */}
        {
          searchWidth ? (<div className="w-full h-fit rounded-full px-4">
            <div className="flex flex-row  w-full h-fit border-[2px] border-white rounded-full">
          <input
            type="text"
            name="searchUser"
            value={searchUser}
            onChange={(e)=>setsearchUser(e.target.value)}
            placeholder="Search chats..."
            className=" flex-1 w-full h-9 rounded-md px-3 text-gray-800 font-medium border-none outline-none shadow-sm"
          />
          <RxCross2 onClick={()=>setSearchWidth(false)} className="w-7  h-9" />
        </div>

          </div>):(
          <div onClick={()=>setSearchWidth(true)} className=" mx-4 h-fit w-fit p-1 rounded-full border-[2px] border-white">
         <IoSearchSharp className="h-7 w-7 text-black" />
        </div>
        )
        }
       
      </div>

      {/* 💬 Chat List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {
          filteruser().length === 0 ? (<h2>No Users Found</h2>):
        filteruser().map((chat) => (
          <NavLink key={chat._id} to={`/chats/${chat._id}`}
          onClick={onChatSelect}
          >
            <div
           
            className="flex items-center gap-3 bg-white rounded-lg p-2 hover:bg-blue-50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md mb-2"
          >
            <img
              src={chat.image}
              alt={chat.name}
              className="h-12 w-12 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm md:text-base">
                {chat.name}
              </p>
              <span className="text-xs text-gray-500">{onlineUsers.includes(chat._id) ? "Online":null}</span>
            </div>
          </div>
          </NavLink>
          
        ))}
      </div>

      {/* 🚪 Logout Button */}
      <div onClick={()=>logout()} className="flex justify-center py-3 border-t border-gray-200 bg-white">
        <NavLink
          to={"/"}
          className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-full text-white shadow-md hover:scale-110 transition-transform duration-300"
        >
          <AiOutlineLogout className="h-6 w-6" />
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
