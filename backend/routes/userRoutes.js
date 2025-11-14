import {signIn,signUp,forgotPassword,profile,getAllUsers} from "../controllers/userControllers.js"
import express from 'express';
import upload from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.post("/signin",signIn);
userRouter.post("/signup",signUp);
userRouter.post("/forgotPassword",forgotPassword);
userRouter.post("/profile",upload.single('image'),profile);
userRouter.post("/allUsers",getAllUsers)
export default userRouter;