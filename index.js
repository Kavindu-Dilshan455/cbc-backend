import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()


const app = express();
app.use(bodyParser.json())

const mongoUrl = process.env.MONO_DB_URI
mongoose.connect(mongoUrl,{})
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("database connected")
})
// app.post("/",
//     (req,res)=>{
        
        

//         const newStudent = new Student(req.body)

//         newStudent.save().then(
//             ()=>{
//                 res.json({
//                     massege : "student created"
//                 })
//             }
//         )
// })

// app.get(

//     ()=>{

//         console.log('hello world');
        
      
//     }
// );



// app.post("/",
//     ()=>{
//         console.log("thisklhh is post msg");
//     }
// );

app.listen(
    3000,
    ()=>{
    console.log('server is running on port 3000');
    }
)

/////////////////////////////////////////////////
app.use(
    (req,res,next)=>{
        const token = req.header("Authorization")?.replace("Bearer ","")
        // console.log(token)

        if(token!=null){
            jwt.verify(token,"Pakayacbc1.",(error,decoded)=>{
                if(!error){
                    // console.log(decoded)
                    req.user=decoded
                }
            })
        }next()
    }
)

app.use("/api/students",studentRouter)
app.use("/api/product",productRouter)

app.use("/api/user",userRouter)


