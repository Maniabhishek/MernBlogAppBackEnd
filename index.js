import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/PostsRouter.js";
import userRouter from "./router/UserRouter.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//router
app.use('/posts',router)
//login and signUp
app.use('/user',userRouter);

app.get('/',(req,res)=>{
    res.send("hello welcome to api")
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL,{ useUnifiedTopology: true,useNewUrlParser: true})
.then(()=>app.listen(PORT,()=>console.log(`server running on ${PORT}`)))
.catch((error)=>console.log(error));

mongoose.set('useFindAndModify',false);
