import { createProduct, deleteProduct, getProducts, updateProduct , getProductId } from "../Controllers/productController.js";
import express from "express";

const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.post("/",createProduct);
productRouter.delete("/:productID",deleteProduct);
productRouter.put("/:productID",updateProduct);
productRouter.get("/:productID", getProductId);

export default productRouter;