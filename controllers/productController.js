import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){

    if(!isAdmin(req)){
        res.json({
            message : "please login as administrator to create products"
        })
        return
    }

    const newProductData = req.body
    const product = new Product(newProductData)

    product.save().then(()=>{

        req.json({
            message : "product created"
        })
    }).catch((error)=>{
        res.json({
            message : error
        })
    })
}

export function getProduct(req,res){
    product.find({}).then((products)=>{
        res.json(products)
    })
}