import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


export function createUser(req,res){

    const newUserData = req.body

    if(newUserData.type == "admin"){

        if(req.User == null){
            res.json({
                message : "please login as administrator to create admin accounts"

            })
            return
        }
        if(req.user.type != "admin"){
            res.json({
                message : "please login as administrator to create admin accounts 2"
            })
        }
    }

    newUserData.password = bcrypt.hashSync(newUserData.password,10)
    console.log(newUserData)

    const user = new User(newUserData)
    user.save().then(()=>{
        res.json({
            message : "user added"
        })
    }).catch(()=>{
        res.json({
            message : "user not added"
        })
    })
   
}

export function loginUser(req,res){

    User.find({email: req.body.email}).then(
        (users)=>{
            if(users.length==0){
                res.json({
                    message:"user not found"
                })
            }else{

                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
                if(isPasswordCorrect){


                    const token = jwt.sign({

                        email: user.email,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        isBlocked:user.isBlocked,
                        type:user.type,
                        propic:user.propic

                    },process.env.SECRETE)
                    console.log(token)

                    res.json({
                        message:"loggin success!",
                        token: token
                    })
                }else{
                    res.json({
                        message:"password incorrect. please try again!"
                    })
                }
            }
        }
    )
}

export function isAdmin(req){

    if(req.user == null){
        return false
    }

    if(req.user.type != "admin"){
        return false
    }
    return true
}

export function isCustomer(req){

    if(req.user == null){
        return false
    }

    if(req.user.type != "customer"){
        return false
    }
    return true
}