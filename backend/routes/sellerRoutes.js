const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { sellerModel, productModel } = require("../db");
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
} = require("../token");
const { cloudinary } = require("../config/cloudinary");
const multer = require("multer");
const streamifier = require("streamifier");
const sellerRouter = express.Router();

//register
sellerRouter.post("/register", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(50).email("Invalid email format"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be less than 20 characters" })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: "Password must contain at least one special character",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  });

  const { mobile, email, category, gstin, password, name } = req.body;

  if (
    !email ||
    !mobile ||
    !category ||
    !email ||
    !password ||
    !gstin ||
    !name
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sellerModel.create({
      email,
      mobile,
      category,
      gstin,
      password: hashedPassword,
      name,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (err.code === 11000) {
      // Handle duplicate email error (assuming email has a unique index in DB)
      return res
        .status(400)
        .json({ message: "Email or Number already in use" });
    }
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});
//login
sellerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await sellerModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // Optionally store the refresh token in the database (or Redis)
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({ accessToken, refreshToken });
    console.log(user);
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});
// forget-password
sellerRouter.post("/forget", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user exists
    const user = await sellerModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Redirect to signup." });
    }
    if (!user.password) {
      return res.status(401).json({
        message: "User must log in with Google. Redirect to Google login.",
      });
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Valid for 10 min
    await user.save();
    // Send Email
    await sendEmail({
      subject: "Reset Password OTP Flipkart",
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
      to: email,
      from: process.env.EMAIL,
    });
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in forget password route:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// verify otp
sellerRouter.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await sellerModel.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

  res.json({ message: "OTP verified successfully" });
});

//reset password
sellerRouter.post("/reset-password", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const user = await sellerModel.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
});

//refresh
sellerRouter.post("/refresh-token", async (req, res) => {
  // console.log("req headers="+req.headers.authorization);
  const refreshToken = req.headers.authorization?.split(" ")[1];
  // console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "refresh_secret"
    );
    const user = await sellerModel.findById(decoded.userId);
    console.log(user);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

//logout
sellerRouter.post("/logout", async (req, res) => {
  // console.log("req headers="+req.headers.authorization);
  const refreshToken = req.headers.authorization?.split(" ")[1];
  if (refreshToken) {
    const user = await sellerModel.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }
  res.status(200).json({ message: "Logged out successfully" });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// add product
sellerRouter.post("/product/add", authenticateToken, upload.array("images", 10), async (req, res) => {
  const sellerId = req.userId; // Get seller ID from token
  try {
      const { category, quantity, discount, name, price, cuttedPrice, tags } = req.body;
  
      const brand=JSON.parse(req.body.brand || "[]")
      // ✅ Parse JSON Strings
      const highlights = JSON.parse(req.body.highlights || "[]");
      const specifications = JSON.parse(req.body.specifications || "[]");

      let imageUrls = [];

      // ✅ Handle file uploads properly
      if (req.files && req.files.length > 0) {
          const uploadPromises = req.files.map((file) => {
              return new Promise((resolve, reject) => {
                  const uploadStream = cloudinary.uploader.upload_stream(
                      { upload_preset: "product" },
                      (error, result) => {
                          if (error) {
                              console.error("Cloudinary Upload Error:", error);
                              reject(error);
                          } else {
                              resolve(result.secure_url);
                          }
                      }
                  );
                  uploadStream.end(file.buffer);
              });
          });

          // Wait for all uploads to complete
          imageUrls = await Promise.all(uploadPromises);
      }

      // console.log("Uploaded Images:", imageUrls);

      // ✅ Add existing Cloudinary image URLs
      if (req.body.existingImages) {
          const existingImages = Array.isArray(req.body.existingImages)
              ? req.body.existingImages
              : [req.body.existingImages]; // Ensure it's an array
          imageUrls.push(...existingImages);
      }

      // ✅ Create new product
      const newProduct = await productModel.create({
          name,
          highlights,
          specifications,
          category,
          price,
          cuttedPrice,
          quantity,
          images: imageUrls, // ✅ Store images as an array of strings
          brand,
          tags,
          discount
      });

      // ✅ Find seller and update their products array
      const seller = await sellerModel.findById(sellerId);
      if (!seller) {
          return res.status(404).json({ message: "Seller not found" });
      }
      seller.products.push(newProduct._id);
      await seller.save();

      res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
      res.status(500).json({ message: "Error creating product", error: error.message });
  }
});

// update product
sellerRouter.put("/product/update/:productId",
  authenticateToken,
  async (req, res) => {
    const sellerId = req.userId; // Seller ID from token
    const productId = req.params.productId; // Product ID from params
    const updatedData = req.body; // Updated fields
    try {
      // Find the product
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if the seller owns this product
      const seller = await sellerModel.findOne({
        _id: sellerId,
        products: productId,
      });
      if (!seller) {
        return res
          .status(403)
          .json({ message: "Unauthorized: You do not own this product" });
      }
      // Update product
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        { $set: updatedData },
        { new: true, runValidators: true } // Return updated product & validate fields
      );

      res
        .status(200)
        .json({
          message: "Product updated successfully",
          product: updatedProduct,
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  }
);
//delete product
sellerRouter.delete("/product/delete/:productId",authenticateToken,
    async (req, res) => {
    const sellerId = req.userId; // Seller ID from token
    const productId = req.params.productId; // Product ID from params

    try {
      // Find the product
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if the seller owns this product
      const seller = await sellerModel.findOne({
        _id: sellerId,
        products: productId,
      });
      if (!seller) {
        return res
          .status(403)
          .json({ message: "Unauthorized: You do not own this product" });
      }

      // Remove product from seller's products array
      seller.products = seller.products.filter(
        (id) => id.toString() !== productId
      );
      await seller.save();

      // Delete the product from database
      await productModel.findByIdAndDelete(productId);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    }
  }
);
// get product
sellerRouter.get("/products", authenticateToken, async (req, res) => {
  const sellerId = req.userId; // Get seller ID from token
  try {
    // Find seller and populate products
    const seller = await sellerModel.findById(sellerId).populate("products");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res
      .status(200)
      .json({
        message: "Products retrieved successfully",
        products: seller.products,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

module.exports = { sellerRouter };
