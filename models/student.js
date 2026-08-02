import mongoose from "mongoose";

// create schema and model

const studentSchema = new mongoose.Schema(
    {
         name : String,
         age : Number,
         city : String   
    }
)
const Student = mongoose.model("Student",studentSchema)

export default Student

