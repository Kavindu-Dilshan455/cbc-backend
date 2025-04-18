import Student from "../models/student.js"

export function getStudent(req,res){
    Student.find().then((studentList)=>{(
        res.json({
            list : studentList
        })
    )})
}

export function createStudent(req,res){

    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message : "student add"
        })
    }).catch(()=>{
        res.json({
            message : "student not added"
        })
    })
   
}

export function deleteStudent(req,res){
    Student.deleteOne({name:req.body.name}).then(
        ()=>{
            res.json(
                {
                    message: "student removed succesfully"
                }
            )
        }
    )
}

