

import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import imagee from "../../assets/fpimagee.png";
import { Contextt } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigator = useNavigate();
  const {fPassOnChange,loading,fPassOnSubmit,fPassword,setfPassword,setShowPassword,showPassword} = useContext(Contextt);
 const submitter = async (e) => {
  e.preventDefault();

  try {
    const success = await fPassOnSubmit(e); // pass event if needed inside
    if (success) {
      navigator("/signin"); // redirect only if success is true
    }
  } catch (error) {
    console.error("Submitter Error:", error);
    toast.error("Something went wrong, please try again.");
  }
};
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Left Section (Image) */}
      <div className="hidden md:flex md:w-[45vw] flex-col justify-center items-center text-center  text-white ">
        <img src={imagee} className="h-full w-full" alt="Forgot Password" />
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-10 py-10 gap-5 bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-gray-800">
          Forgot Password?
        </h1>

        <p className="text-gray-500 text-sm sm:text-base md:text-lg  font-medium tracking-wider">
         Enter your email address associated with your account!!!
        </p>

        <form
          onSubmit={submitter}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm sm:text-base font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={fPassword.email}
              onChange={fPassOnChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#fd4a31] focus:ring-1 focus:ring-[#fd4a31] transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm sm:text-base font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-md gap-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={fPassword.password}
                onChange={fPassOnChange}
                placeholder="Enter your password"
                className="w-full border-none rounded-md px-3 py-2 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 cursor-pointer text-gray-600 hover:text-[#fd4a31]"
              >
                {showPassword ? (
                  <IoMdEyeOff className="h-6 w-6" />
                ) : (
                  <IoMdEye className="h-6 w-6" />
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full font-bold text-base sm:text-lg shadow-md transition-all bg-[#fd4a31] text-white hover:bg-[#e03b2a]"
          >
            {loading ? "Processing":"Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;


