import hashGenrate from "../helpers/hashGenrator.js";
import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import fs from 'fs';
import imagekit from "../config/imagekit.js";
const createToken =  (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "7d" })
}
const signIn = async(req,res)=>{
  try{
    const {email,password} = req.body;
     if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Input missing" });
    }
    const user = await UserModel.findOne({email});
    if(!user){
       return res.status(400).json({ success: false, msg: "This email is not registered !!!" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
       return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.status(200).json({ success: true, msg: "Login Completed",token,user:{
      name:user.name,
      id:user._id,
      email:user.email,
      image:user.image,
      userName:user.userName
    }});
  }catch(e){
    console.log(e);
     res.status(500).json({ success: false, msg: e.message});
  }
}


const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 1️⃣ Check if any field is missing
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, msg: "Input missing" });
    }

    // 2️⃣ Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "User already registered !!!" });
    }

    // 3️⃣ Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Enter a valid email !!!" });
    }

    // 4️⃣ Validate password strength
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, msg: "Weak password !!! (min 8 chars)" });
    }

    // 5️⃣ Hash password
    const hashPassword = await hashGenrate(password);

    // 6️⃣ Create new user
    const userData = new UserModel({
      name,
      email,
      password: hashPassword,

    });

    const newUser = await userData.save();

    // 7️⃣ Create JWT token
    const token = createToken(newUser._id);

    // 8️⃣ Send success response
    res
      .status(201)
      .json({ success: true, msg: "SignUp Completed !!!", token,user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        image:newUser.image,
        userName:newUser.userName
      } });
  } catch (e) {
    console.log("Signup Error:", e);
    res.status(500).json({ success: false, msg: e.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate Input
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email and Password are required" });
    }

    // 2️⃣ Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found !!!" });
    }

    // 3️⃣ Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ success: false, msg: "Password must be at least 8 characters long" });
    }

    // 4️⃣ Hash new password
    const hashedPassword = await hashGenrate(password);

    // 5️⃣ Update password in DB
    await UserModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    // 6️⃣ Response
    return res.status(200).json({
      success: true,
      msg: "Password updated successfully!",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};


const profile = async (req, res) => {
  try {
    const { id, userName } = req.body;
// 2️⃣ Check if file exists
    const imageFile = req.file; // multer से आएगा
    // 1️⃣ Input Validation
    if (!id || !userName || !imageFile) {
      return res.status(400).json({ success: false, msg: "Input is missing" });
    }

    
    let optimizedImage = null;

    if (imageFile) {
      // Read file from local storage
      const imageBuffer = fs.readFileSync(imageFile.path);

      // Upload image to ImageKit
      const uploadResponse = await imagekit.upload({
        fileName: imageFile.originalname,
        file: imageBuffer,
        folder: "/pingMe-user",
      });

      // Optimize image URL
      optimizedImage = imagekit.url({
        src: uploadResponse.url,
        transformation: [
          { quality: "auto" },
          { width: "1280" },
          { format: "webp" },
        ],
      });

      // Optional: delete local temp file after upload
      fs.unlinkSync(imageFile.path);
    }

    // 3️⃣ Prepare update data
    const updateData = {};
    if (userName) updateData.userName = userName;
    if (optimizedImage) updateData.image = optimizedImage;

    // 4️⃣ Update user in DB
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found !!!" });
    }

    // 5️⃣ Send success response
    return res.status(200).json({
      success: true,
      msg: "Profile updated successfully!",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        userName: updatedUser.userName,
        email: updatedUser.email,
        image: updatedUser.image,
      },
    });

  } catch (e) {
    console.error("Profile Update Error:", e);
    return res.status(500).json({ success: false, msg: e.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { id } = req.body;

    // 1️⃣ Validation
    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Input is missing",
      });
    }

    // 2️⃣ Find all users except the given id
    const users = await UserModel.find({ _id: { $ne: id } }).select("-password");

    // 3️⃣ Check if users exist
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No users found",
      });
    }

    // 4️⃣ Success response
    return res.status(200).json({
      success: true,
      msg: "Users fetched successfully",
      users,
    });

  } catch (e) {
    console.error("Error fetching users:", e);
    return res.status(500).json({
      success: false,
      msg: e.message || "Server error",
    });
  }
};

export {
  signIn,signUp,forgotPassword,profile,getAllUsers,
}