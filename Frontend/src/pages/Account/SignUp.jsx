import React, { useState } from "react";
import { TbBrandFacebookFilled } from "react-icons/tb";
import { FaGooglePlusG } from "react-icons/fa6";
import { TfiLinkedin } from "react-icons/tfi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Contextt } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const icon = [
    <TbBrandFacebookFilled key="fb" />,
    <FaGooglePlusG key="google" />,
    <TfiLinkedin key="linkedin" />,
  ];
const {signUp,setSignUp,showPassword,setShowPassword,signUpOnChange,signUpOnSubmit} = useContext(Contextt);
const submitter = async(e)=>{
  e.preventDefault();
  const success = await signUpOnSubmit();
  if(success)navigate("/profile")
}

  // ✅ Password validation conditions
  const validations = {
    length: signUp.password.length >= 8,
    upper: /[A-Z]/.test(signUp.password),
    lower: /[a-z]/.test(signUp.password),
    digit: /[0-9]/.test(signUp.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(signUp.password),
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
       <div className="hidden md:flex md:w-[45vw] flex-col justify-center items-center text-center bg-gradient-to-br from-[#ff4069] to-[#fd4a31] text-white p-8">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 tracking-wide">
          Welcome Back!
        </h1>
        <p className="text-base md:text-lg lg:text-xl font-medium mb-6 max-w-md text-gray-200">
            To Keep Connected with Us Please Login with Your Personal Info
        
        </p>
        <button className="px-10 py-2 border-2 border-white rounded-full text-lg font-semibold hover:bg-white hover:text-[#fd4a31] transition-all duration-300">
        <NavLink to={"/signin"}> Sign In</NavLink>
        </button>
      </div>
      {/* Left Section (Form Section) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-10 py-10 gap-5 bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-gray-800">
          Create Account
        </h1>

        {/* Social Icons */}
        <div className="flex gap-4">
          {icon.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-xl border border-gray-400 rounded-full w-12 h-12 hover:bg-gray-100 transition-all duration-200 cursor-pointer shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium tracking-wide">
          Or use your email for registration
        </p>

        {/* Input Fields */}
        <form
          onSubmit={submitter}
          className="w-full max-w-sm flex flex-col gap-4"
        >

            {/* Name here */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm sm:text-base font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={signUp.name}
              onChange={signUpOnChange}
              placeholder="Enter your Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#fd4a31] focus:ring-1 focus:ring-[#fd4a31] transition-all"
            />
          </div>
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
              value={signUp.email}
              onChange={signUpOnChange}
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
                value={signUp.password}
                onChange={signUpOnChange}
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

            {/* Password Criteria */}
            <div className="text-xs sm:text-sm mt-2 space-y-1">
              <p className={validations.length ? "text-green-600" : "text-red-500"}>
                • At least 8 characters
              </p>
              <p className={validations.upper ? "text-green-600" : "text-red-500"}>
                • At least one uppercase letter (A-Z)
              </p>
              <p className={validations.lower ? "text-green-600" : "text-red-500"}>
                • At least one lowercase letter (a-z)
              </p>
              <p className={validations.digit ? "text-green-600" : "text-red-500"}>
                • At least one number (0-9)
              </p>
              <p className={validations.special ? "text-green-600" : "text-red-500"}>
                • At least one special character (!@#$%^&)
              </p>
            </div>
          </div>

          

          <button
            type="submit"
            disabled={
              !(
                validations.length &&
                validations.upper &&
                validations.lower &&
                validations.digit &&
                validations.special
              )
            }
            className={`w-full py-2 rounded-full font-bold text-base sm:text-lg shadow-md transition-all 
            ${
              validations.length &&
              validations.upper &&
              validations.lower &&
              validations.digit &&
              validations.special
                ? "bg-[#fd4a31] hover:bg-[#ff684e] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>

      
     
    </div>
  );
};

export default SignUp;
