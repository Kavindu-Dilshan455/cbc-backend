import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type:String,
        requered:true,
        unique:true
    },
    firstName:{
        type:String,
        requered:true
    },
    lastName:{
        type:String,
        requered:true
    },
    password:{
        type:String,
        requered:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        default:"customer"
    },
    propic:{
        type:String,
        default:"https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=fab01486-0c7e-451f-993a-c74b727a752a&query=User"
    }

})
const User = mongoose.model("user",userSchema)
export default User;