import { trusted } from "mongoose";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productID : {
            type : String,
            required : true,
            unique : true
        },

        name : {
            type : String,
            required : true
        },

        altNames : {
            type : [String] ,
            default : [],
            required: trusted
        },

        description : {
            type : String,
            required : true 
        },
        images : {
            type : [String],
            required : true,
            default : []
        },
        price : {
            type : Number,
            required : true
        },
        lablledPrice : {
            type : Number,
            required : true
        },
        category : {
            type : String,
            required : true,
        }
    }
)

const Product = mongoose.model ("Product" , productSchema)
export default Product