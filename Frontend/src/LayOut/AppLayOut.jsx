
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./UI/SideBar";
import { Contextt } from "../Context/AppContext";

const AppLayout = () => {
  const {isChatOpen,setIsChatOpen} = useContext(Contextt);
 

  return (
    <div className="w-full h-screen flex bg-[#dadbd3] m-0 p-0 overflow-hidden">
      <div className="w-full h-full flex bg-white shadow-sm overflow-hidden">
        
        {/* Left Sidebar */}
        <aside
          className={`${
            isChatOpen ? "hidden md:flex" : "flex"
          } w-full md:w-[35vw] lg:w-[30vw] bg-[#f0f2f5] border-r border-gray-300 h-full flex-col transition-all duration-300`}
        >
          <SideBar onChatSelect={() => setIsChatOpen(true)} />
        </aside>

        {/* Right Chat Section */}
        <main
          className={`${
            isChatOpen ? "flex" : "hidden md:flex"
          } flex-1 bg-[#efeae2] relative transition-all duration-300`}
        >
         
          {/* <div className="absolute inset-0 bg-[url('https://i.imgur.com/OyAfU3b.png')] bg-cover bg-center opacity-10 pointer-events-none"></div> */}

          {/* Chat container */}
          <div className="relative flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            {/* Back button visible only on mobile */}
            {/* <button
              onClick={() => setIsChatOpen(false)}
              className="md:hidden absolute top-3 left-3 z-20 bg-white/70 backdrop-blur-sm px-3 py-1 rounded shadow"
            >
              ← Back
            </button> */}

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
