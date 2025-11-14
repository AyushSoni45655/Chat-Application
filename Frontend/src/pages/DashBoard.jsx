import React, { useContext } from 'react'
import { Contextt } from '../Context/AppContext'

const DashBoard = () => {
  const {isChatOpen} = useContext(Contextt);
  isChatOpen !== true 
  return (
    <div className='w-full flex flex-col gap-2 items-center justify-center h-screen'>
     <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl tracking-widest '>Welcome to PingMe....</h1>
     <p className='font-bold text-md sm:text-lg md:text-xl tracking-wide text-green-500'>Let's start</p>
    </div>
  )
}

export default DashBoard
