import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import productRouter from './routes/productRouter.js';
dotenv.config()


const app = express();
app.use(bodyParser.json())

const mongoUrl = process.env.MONGO_DB_URI
mongoose.connect(mongoUrl,{})
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("database connected")
})



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
            jwt.verify(token,process.env.SECRETE,(error,decoded)=>{
                if(!error){
                    // console.log(decoded)
                    req.user=decoded

                    // console.log(decoded)
                }
            })
        }next()
    }
)

// app.use("/api/students",studentRouter)


app.use("/api/user",userRouter)
app.use("/api/products", productRouter)


// "email": "kavindu@example.com",
//   "password": "SecurePassword123",
//   "type": "admin"

//  "email": "navindu@example.com",
//   "password": "SecurePassword1234",
//   customer