const express = require('express');
const { productModel } = require('../db');
const { authenticateToken } = require('../token');
const productRouter=express.Router();

productRouter.get("/",async(req,res)=>{
    try {
        const products=await productModel.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({"message":error})
    }
})
productRouter.get("/search", async (req, res) => {
    try {
      const {
        search = "",
        minPrice = 0,
        maxPrice = Number.MAX_SAFE_INTEGER,
        rating = 0,
        sortBy = "relevance", // can be "priceAsc", "priceDesc", "ratingAsc", "ratingDesc"
        page = 1,
        limit = 10,
      } = req.query;
  
      const query = {
        ...(req.query.minPrice || req.query.maxPrice
          ? { price: { $gte: Number(minPrice), $lte: Number(maxPrice) } }
          : {}),
        ...(req.query.rating ? { rating: { $gte: Number(rating) } } : {}),
      };
      
  
      // 🔍 Search by name, tags, or brand.name
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { tags: { $regex: search, $options: "i" } },
          { "brand.name": { $regex: search, $options: "i" } },
        ];
      }
  
      // 🔃 Sorting
      const sortOptions = {
        priceAsc: { price: 1 },
        priceDesc: { price: -1 },
        ratingAsc: { rating: 1 },
        ratingDesc: { rating: -1 },
      };
  
      const sort = sortOptions[sortBy] || {};
  
      // 📃 Pagination
      const skip = (Number(page) - 1) * Number(limit);
    //   console.log(query);
      const products = await productModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));
  
      const totalCount = await productModel.countDocuments(query);
  
      res.status(200).json({
        products,
        totalCount,
        currentPage: Number(page),
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
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

productRouter.post("/addToCart/:productId/:quantity",authenticateToken,async (req,res)=>{
  const uId=req.userId;
  const {productId,quantity}=req.params
  try {
    const user=await userModel.findById(uId)
    if(!user){
      return res.status(403).json({
        message: "User not found",
      });
    }
    const existingProduct = user.Cart.find(item => item.productId.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += parseInt(quantity);
    } else {
      user.Cart.push({ productId, quantity: parseInt(quantity) });
    }

    await user.save();

    return res.status(200).json({ message: "Product added to cart", cart: user.Cart });
  }catch(e){
    console.error(e);
    return res.status(500).json({ message: "Server error while adding to cart" });
  }
})

productRouter.post("/removeFromCart/:productId/:quantity",authenticateToken,async (req,res)=>{
  const uId = req.userId;
  const { productId, quantity } = req.params;

  try {
    const user = await userModel.findById(uId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const productIndex = user.Cart.findIndex(item => item.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (user.Cart[productIndex].quantity > parseInt(quantity)) {
      user.Cart[productIndex].quantity -= parseInt(quantity);
    } else {
      user.Cart.splice(productIndex, 1); // remove the product from cart
    }

    await user.save();

    return res.status(200).json({ message: "Product removed/updated in cart", cart: user.Cart });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error while removing from cart" });
  }
})
productRouter.get("/cart",authenticateToken,async(req,res)=>{
  const uId=req.userId;
  const {productId,quantity}=req.params
  try {
    const user = await userModel.findById(uId).populate("Cart.productId"); // Populate product details
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: user.Cart });
  }catch(e){
    console.error(e);
    return res.status(500).json({ message: "Server error while fetching cart" });
  }
})


module.exports={productRouter}