
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import AppLayOut from "./LayOut/AppLayOut";
import SignIn from "./pages/Account/SignIn"
import SignUp from "./pages/Account/SignUp"
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import DashBoard from "./pages/DashBoard";
import Chats from "./pages/Chats";
import ForgotPassword from "./pages/Account/ForgotPassword";
import Profile from "./pages/Profile";
import {io} from 'socket.io-client';
import { useContext, useEffect } from "react";
import { Contextt } from "./Context/AppContext";
function App() {
  
const router = createBrowserRouter([
{
  path:"/",
  errorElement:<ErrorPage/>,
  element:(
    <PrivateRoute>
      <AppLayOut/>
    </PrivateRoute>
  ),
  children:[
    {
      path:"/",
      element:<DashBoard/>
    },
       {
      path:"/chats/:id",
      element:<Chats/>
    },
 
  
  ]
},
{
  path:"/signin",
  element:(
    <PublicRoute>
      <SignIn/>
    </PublicRoute>
  )
},
{
  path:"/signup",
  element:(
    <PublicRoute>
      <SignUp/>
    </PublicRoute>
  )
},
{
  path:"/forgotPassword",
  element:(
    <PublicRoute>
      <ForgotPassword/>
    </PublicRoute>
  )
},
   {
  path:"/profile",
  element:<Profile/>
}


]);
const {user,partnerTyping,setPartnerTyping,onlineUsers,setOnlineUsers,socketId,setSocketId,receiverId} = useContext(Contextt)
console.log("all Online User",onlineUsers);
console.log("I am a a socket id ",socketId);


useEffect(()=>{
  if(user){
  const socketio = io(import.meta.env.VITE_BACKEND_URL,{
    query:{
      userId:user?.id,
      receiverId:receiverId
    }
  });
  setSocketId(socketio);
  socketio.on("getOnlineUser",(data)=>{
    setOnlineUsers(data)
  });
  socketio.on('userTyping', ({senderId})=>{
    if(senderId === receiverId)setPartnerTyping(true);
  });
  socketio.on("userStopTyping",({senderId})=>{
    if(senderId === receiverId)setPartnerTyping(false)
  })
return ()=>socketio.close();
  
  }else{
    if(socketId){
      socketId.close();
      setSocketId(null)
    }
  }

},[receiverId,user])
  return <RouterProvider router={router}/>
}

export default App
