import React, { Children, useContext, useEffect } from 'react'
import { Contextt } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
  const {token,isLogin} = useContext(Contextt);
  const navigator = useNavigate();
  useEffect(()=>{
    if(token){
      if(isLogin){
        navigator("/")
      }
      else{
          navigator("/profile")
      }
       
      
     
    }
  },[token,navigator,isLogin]);
  if(token){
    return null;
  }
  return children;
}

export default PublicRoute
