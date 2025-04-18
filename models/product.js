import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : String,
    price : Number,
    description : String
})

const product = mongoose.model("products",productSchema)

export default product;