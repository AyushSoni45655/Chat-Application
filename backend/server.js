import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/message.js";
import { app,server} from './socket/socket.js'
dotenv.config();

// const app = express();

// cors connection here implement
const allowedOrigin = [
  process.env.FRONTEND_URL,
  "https://chat-application-frontend-aoli.onrender.com/signin"
]
app.use(cors({
  origin:(origin,callback)=>{
    if(!origin || allowedOrigin.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error("not allowed by cors"))
    }
  },
  methods:["GET",'POST','PUT','DELETE'],
  credentials:true
}));
// middlewares here
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// routes here
// user routes here
app.use("/api/user",userRouter);
// message routes here
app.use("/api/message",messageRouter)

app.use("/",(req,res)=>{
  res.send("server is running!");
});


// mongodb connection here
connectDB();
const port = process.env.PORT || 5000;
server.listen(port, ()=>{
  console.log(`The server is running on http//localhost:${port}`);
})
