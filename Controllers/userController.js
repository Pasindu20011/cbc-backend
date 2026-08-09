import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export function createUser (req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password,10) 

    const user = new User(
        {
            email : req.body.email,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password : hashedPassword
        }
    )
    user.save().then(
        ()=>{
            res.json({
                message : "User created successfully"

            })
        }
    ).catch(
        (err)=>{
            console.error(err)
            res.json({
                message : "Failed Create User"
            })
        }
    )
}
export function loginUser(req,res){
User.findOne( 
    {
            email : req.body.email
    }
).then( 
    (user)=>{
        if(user==null){
            res.status(404).json(
                {
                    message:"User not found!." 
                }
            )
        
        }else{
           const ispasswordMatching = bcrypt.compareSync(req.body.password,user.password) 
           if(ispasswordMatching){

             const token = jwt.sign(
                {
                    email : user.email,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    role : user.role,
                    isEmailVerified : user.isEmailVerified,

                },process.env.JWT_SECRET
             )
             
             res.json({
                message : "Login Successfull",
                token : token,
                user :{
                    email : user.email,
                    firstname : user.firstname,
                    lastname : user.lastname,
                    role : user.role,
                    isEmailVerified : user.isEmailVerified,
                }         
             })
             
           }else{
            res.status(401).json({
                message : "Invalid Password!."
            })
           }
     }
    } 
  )
}

export function isAdmin(req){
    if (req.user == null){
        return false; 
    }
    if (req.user.role != "admin"){
        return false
    }
    return true
}