import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(bodyParser.json())

const mongoUrl = "mongodb+srv://s20352:123@cluster0.vxm6p5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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


