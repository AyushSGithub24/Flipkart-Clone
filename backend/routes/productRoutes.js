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


module.exports={productRouter}