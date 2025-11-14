import {sendMessage,getMessages} from "../controllers/message.js";
import express from 'express';
import upload from "../middlewares/multer.js";
const messageRouter = express.Router();
messageRouter.post("/send",upload.single('image'),sendMessage);
messageRouter.post("/get",getMessages)
export default messageRouter;