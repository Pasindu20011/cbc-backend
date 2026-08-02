
import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import { loginUser } from "./Controllers/userController.js";
import productRouter from "./routers/productsRouter.js";

// create express app

const app = express();

//....

app.use(express.json());

app.use(
 (req,res,next)=>{
        let token = req.header("Authorization")
       
        if(token!=null){
        token = token.replace("Bearer ","")
        jwt.verify(token, "jwt-secret",(err,decoded)=>{
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

app.use("/students", studentRouter)
app.use("/users" , userRouter)
app.use("/products",productRouter)

// connect the database

const connectionString ="mongodb://admin:00000@ac-klpibuf-shard-00-00.t8hijij.mongodb.net:27017,ac-klpibuf-shard-00-01.t8hijij.mongodb.net:27017,ac-klpibuf-shard-00-02.t8hijij.mongodb.net:27017/?ssl=true&replicaSet=atlas-6iih7s-shard-0&authSource=admin&appName=Cluster0"

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




