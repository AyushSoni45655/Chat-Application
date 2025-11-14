import React, { useRef, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";

import { useContext } from "react";
import { Contextt } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigator = useNavigate();

  const {imagePreview,user,setImagePreview,profileData,setProfileData,fileInputRef,profileOnChange,handleCameraClick,profileOnSubmit} = useContext(Contextt);

  const submitter = async (e)=>{
    e.preventDefault();
    const success = await profileOnSubmit();
    if(success)navigator("/",{replace:true});
  }
 

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <form
        onSubmit={submitter}
        className="flex flex-col gap-6 w-full max-w-md bg-white/60 backdrop-blur-md shadow-lg p-8 rounded-2xl items-center border border-white/30"
      >
        {/* Profile Image Section */}
        <div className="relative group h-36 w-36 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
          <img
            src={imagePreview}
            className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt="profile"
          />
          <button
            type="button"
            onClick={handleCameraClick}
            className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-full text-white hover:scale-105 transition-transform shadow-md"
          >
            <MdPhotoCamera className="h-5 w-5" />
          </button>
          <input
            type="file"
            name="image"
            ref={fileInputRef}
            onChange={profileOnChange}
            className="hidden"
          />
        </div>

        {/* Editable Username */}
        <div className="w-full">
          <label className="text-gray-600 text-sm font-semibold">Username</label>
          <input
            type="text"
            name="userName"
            placeholder="Enter your username"
            value={profileData.userName}
            onChange={profileOnChange}
            className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 bg-white/80 transition-all"
          />
        </div>

        {/* Static Info */}
        <div className="w-full flex flex-col gap-3">
          <div className="p-3 rounded-md border border-gray-200 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-500 font-semibold">Full Name</p>
            <p className="text-lg font-bold text-gray-800">{user.name}</p>
          </div>

          <div className="p-3 rounded-md border border-gray-200 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-500 font-semibold">Email</p>
            <p className="text-lg font-bold text-gray-800">
             {user.email}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-full text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
