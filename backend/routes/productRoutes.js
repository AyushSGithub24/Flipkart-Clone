const express = require('express');
const { productModel } = require('../db');
const productRouter=express.Router();

productRouter.get("/",async(req,res)=>{
    try {
        const products=await productModel.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({"message":error})
    }
})
productRouter.get("/:productId",async(req,res)=>{
    const { productId }=req.params;
    // console.log(req)
    console.log(productId);
    try {
        const product=await productModel.findById(productId) .populate({
            path: 'specifications',
            populate: {
                path: 'description',
                model: 'products' // Ensure this matches your actual model name
            }
        })
        // console.log(product.specifications);
        console.log(product.specifications[0].title);
        console.log(product.specifications[0].description[0])
        const data=await productModel.findById(product.specifications[0].description[0])
        console.log(data);
        res.status(200).json({product})
    } catch (error) {
        console.log("error fetching detail "+error);
    }
})

module.exports={productRouter}