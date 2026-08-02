import Student from "../models/student.js";

// create controller

export function getStudent(req,res){
    Student.find()
            .then((data)=>
                {
                    res.json(data)
                    console.log(data)
                }
            ).catch(
                ()=>{
                    console.log("Data is not fetched")
                }
            )
}

// export async function getStudents(req,res){
//     try{
//     const students = await Student.find()
//     res.json(students);
// }catch(err){
//     res.status(500).json({
//         message : "Faild to retrive students"
//     })
// }
// }
// create controller

export function postStudent (req , res){

        if (req.user==null){
            res.status(401).json ({
                message : "Please login and try again!"
            })
            return
        }

        if (req.user.role != "admin"){
            res.status(403).json
           ({
                message : "You must be admin to create Student!" 
            })
            return
        }

         const student = new Student(
            {
            name : req.body.name,
            age : req.body.age,
            city : req.body.city
        }
    )   

        student
        .save()
        .then(
            ()=>
            {
                res.json({
                    message : "Data is inserted"
                })
            }
        ).catch(
            ()=>
            {
                res.json({
                    message : "Data is not inserted"
                });
            }
        );
    }




  