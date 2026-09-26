import Product from "../models/products.js"
import { isAdmin } from "./userController.js";
import User from "../models/user.js";


export async function createProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are not authorized to create a product"
        });
        return;
    }
    
    try{
    const productData = req.body;

    const product = new Product(productData)

    await product.save();
    res.json({
        message : "Product created successfully",
        product : product,
    })
}catch(err){
    console.error(err);
    res.status(403).json({
        message : "Failed to create product!."
    })
}
}
export async function getProducts(req,res){
    console.log("Product fetching")
    try{
        const product = await Product.find();
        res.json(product)    
    }catch(err){
        res.status(500).json({
            message : "Failed to receive products!.",
        })
    }
}
export async function deleteProduct(req,res){
    
    if (!isAdmin(req)){
        res.status(403).json({
            message : "You are NOT Authorized to delete product" 
        });
        return;
    }

    try{
        const productID = req.params.productID
 
        await Product.deleteOne({
            productID : productID
        }) ;
        res.json({
            message : "Product Deleted Successfully!.." 
        })
    }catch(err){
        res.status(404).json({
            message : "Failed to delete Product!."
        });
        
    }
}

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are NOT Authorized to update product"
        });
        return;
    }
    try{
            const productID = req.params.productID;
            const updatedData = req.body;

            await Product.updateOne(
                {productID : productID},
                updatedData
            );
            res.json({
                message : "Product Update Successfully!." 

            })
    }catch(err){
        console.error(err);
        res.status(500).json({
            message : "Failed To Update Product"
        })
    }
}

export async function getProductId(req,res) {
    try{
        const productID = req.params.productID; 
        const product = await Product.findOne({
            productID : productID

        })
        if (product == null){
            res.status(404).json({
                    message : "Product Not Found!.."
            })
        }else{
            res.json(product);
        }

    }catch(err){
            console.error(err);
            res.status(500).json({
                message : " Failed to retrieve product by ID!.. "
            });
    }
     
}