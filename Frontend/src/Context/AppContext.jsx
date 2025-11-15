 import { createContext, useState ,useRef, useEffect} from "react";
import {toast} from 'react-hot-toast';
export const Contextt = createContext();
import axios from 'axios';
import image from "../../src/assets/imageplac.jpg"
import SignIn from "../pages/Account/SignIn";
export const ContextProvider = ({children})=>{
//Backend url
const backend_rul = import.meta.env.VITE_BACKEND_URL;

  // here all the states variable
  const [token,setToken] = useState(localStorage.getItem('token') || "");
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
   const [signUp, setSignUp] = useState({
      name:"",
      email: "",
      password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading] = useState(false);
  //signup implementation here

    const signUpOnChange = (e) => {
      const { name, value } = e.target;
      setSignUp((prev) => ({ ...prev, [name]: value }));
    };
  
    const signUpOnSubmit = async (e) => {
      try {
        setLoading(true);
        const {email,password,name} = signUp;
        if(!email || !password || !name){
          toast.error("Input Missing");
          return;
        }
        const response = await axios.post(`${backend_rul}/api/user/signup`,{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          setUser(response.data.user);
          localStorage.setItem('user',JSON.stringify(response.data.user));
          toast.success(response.data.msg);
          return true;
        }
        else{
          toast.error(response.data.msg);
          return false;
        }
       
      } catch (e){
        console.log("Error submitting");
        toast.error(e.response?.data?.msg || "server error")
        return false;
      }finally{
        setLoading(false)
      }
    };
 

    // profile implementation here
     const [imagePreview, setImagePreview] = useState(image);
      const [profileData, setProfileData] = useState({
        image: "",
        userName: "",
      });
    
      const fileInputRef = useRef(null);
    
      const profileOnChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
          const file = files[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            setProfileData((prev) => ({ ...prev, [name]: file }));
          }
        } else {
          setProfileData((prev) => ({ ...prev, [name]: value }));
        }
      };
    
      const handleCameraClick = () => {
        fileInputRef.current.click();
      };
    
      const profileOnSubmit = async(e) => {
        try{
          setLoading(true);
      
        const {image,userName} = profileData;
        if(!image || !userName){
           toast.error("Enter all fields");
           return;
        }
            const fromdata = new FormData();
        fromdata.append('image', image);
        fromdata.append('userName',userName);
        fromdata.append('id', user.id)


        const response = await axios.post(`${backend_rul}/api/user/profile`,fromdata,{
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});
        if(response.data.success){
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(response.data.user));
          toast.success(response.data.msg);
          return true;
        }else{
          toast.error(response.data.msg);
          return false;
        }

        }catch(e){
          console.log(e);
          toast.error(e.response?.data?.msg || "server error");
          return false;
        }finally{
          setLoading(false);
        }
        
      };
    
   const logout = () => {
  try {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Something went wrong while logging out");
  }
};
const [isLogin,setIsLogin] = useState(false);
// signin functionality here
 const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  

  const signInOnChange = (e) => {
    const { name, value } = e.target;
    setSignIn((prev) => ({ ...prev, [name]: value }));
  };

  const signInOnSubmit = async (e) => {
    try {
      setLoading(true)
      const {email,password} = signIn;
      if(!email || !password){
        toast.error("Input missing");
        return;
      }
      const response = await axios.post(`${backend_rul}/api/user/signin`,{email,password});
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success(response.data.msg);
        setIsLogin(true);
        return true;
      }
      else{
        toast.error(response.data.msg);
        return false;
      }
    } catch (e){
      console.log("Error submitting",e);
      toast.error(e.response?.data?.msg || "server error");
      return false;
    }
    finally{
      setLoading(false);
    }
  };

  // forgot password implementation here

  const [fPassword, setfPassword] = useState({
      email: "",
      password: "",
    });
  
 
  
    const fPassOnChange = (e) => {
      const { name, value } = e.target;
      setfPassword((prev) => ({ ...prev, [name]: value }));
    };
  
    const fPassOnSubmit = async (e) => {
      try {
        setLoading(true);
        const {email , password} = fPassword;
        if(!email || !password){
          toast.error("Input is missing");
          return;
        }
        const response = await axios.post(`${backend_rul}/api/user/forgotPassword`,{email,password});
        console.log(response);
        
        if(response.data.success){
          toast.success(response.data.msg);
          return true;
        }else{
          toast.error(response.data.msg);
          return false;
        }
      } catch (e){
        console.log("Error submitting",e);
        toast.error(e.response?.data?.msg || "server error");
        return false;
      }finally{
        setLoading(false);
      }
    };


    // get all users here expect me
    const [allUsers,setAllUser] = useState([]);
    const getAllUsers = async()=>{
      try{
        setLoading(true)
        const {id} = user;
        if(!id){
          return toast.error("Id is missing !!!");
        }
        const response = await axios.post(`${backend_rul}/api/user/allUsers`,{id});
        if(response.data.success){
          // toast.success(response.data.msg);
          setAllUser(response.data.users);
        }else{
          toast.error(response.data.msg);
        }
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
    }
    useEffect(()=>{
      getAllUsers();
    },[])
  console.log("I am a all users here",allUsers);
  
     const [isChatOpen, setIsChatOpen] = useState(false);

     const [onlineUsers,setOnlineUsers] = useState([]);
     const [socketId,setSocketId] = useState(null);
     const [receiverId,setReceiverId] = useState(null);
     const [partnerTyping,setPartnerTyping] = useState(false);
     console.log("receiver id is a ",receiverId);
     
  const values = {partnerTyping,setPartnerTyping,receiverId,setReceiverId,onlineUsers,setOnlineUsers,socketId,setSocketId,allUsers,isChatOpen, setIsChatOpen,fPassOnChange,fPassOnSubmit,fPassword,setfPassword,isLogin,loading,setSignIn,signIn,showPassword,setShowPassword,signInOnChange,signInOnSubmit,
    logout,imagePreview,setImagePreview,user,profileData,setProfileData,fileInputRef,profileOnChange,handleCameraClick,profileOnSubmit,
    token,signUp,setSignUp,signUpOnChange,signUpOnSubmit}
  return <Contextt.Provider value={values}>{children}</Contextt.Provider>
}
