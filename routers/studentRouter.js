import express from "express";
import { getStudent, postStudent } from "../Controllers/studentController.js";
const studentRouter = express.Router()

studentRouter.get("/", getStudent)
studentRouter.post("/", postStudent)


// export the router

export default studentRouter;