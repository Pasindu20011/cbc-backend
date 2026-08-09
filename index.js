
import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import { loginUser } from "./Controllers/userController.js";
import productRouter from "./routers/productsRouter.js";
import cors from "cors"; 
import dotenv from "dotenv";

dotenv.config();

// create express app

const app = express();


//....

app.use(cors());

app.use(express.json());

app.use(
 (req,res,next)=>{
        let token = req.header("Authorization")
       
        if(token!=null){
        token = token.replace("Bearer ","")
        jwt.verify(token, process.env.JWT_SECRET,
        (err,decoded)=>{
            if(decoded == null){
                res.json({
                    message: "invalid token please login"
                })
                return
           }else{
            req.user = decoded
           }
        }
      )
    }
 next() 
})
// use the router           
 
app.use("/api/students", studentRouter)
app.use("/api/users" , userRouter)
app.use("/api/products",productRouter)

// connect the database

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString)
.then(
    ()=>{
        console.log("Database Is Connected")
    }
).catch(
    (err)=>{
        console.log("Database is not connected")
        console.log(err)
    }
)

// create the server

app.listen(5000,
    ()=> { console.log("server is runnig on port 5000")
            })




