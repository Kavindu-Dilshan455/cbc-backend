import product from "../models/product.js";


export async function getProduct(req,res){

    const productList = await product.find()

    res.json({
        list : productList
})
}

export function createProduct(req,res){

    ////////////////////////////
    console.log(req.user)
    if(req.user==null){
        res.json({
            message:"you are not logged in"
        })
        return;
    }
    if(req.user.type!="admin"){
        res.json({
            message:"you are not an admin"
        })
        return
    }

    const Product = new product(req.body)

    Product.save().then(
        ()=>{
            res.json({
                message:"product added"
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message:"error"
            })
        }
    )
}

export function deleteProduct(req,res){
    product.deleteOne({name:req.params.name}).then(
        ()=>{
            res.json(
                {
                    message: "product removed succesfully"
                }
            )
        }
    )
}

export function getProductByName(req,res){
    
    //const name = req.body.name;
    const name = req.params.name;

    product.find({name : name}).then(
        (productList)=>{
            res.json({
                list : productList
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"error"
            })
        }
    )
}