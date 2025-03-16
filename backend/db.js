const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  name: String,
  refreshToken: String,
  Address: Array,
  phone: Number,
  Orders: Array,
  resetPasswordOTP: Number,
  resetPasswordExpires: Number,
  gender: {
    type: String,
    enum: ["male", "female", "others"], // Corrected enum definition
  },
});
const userModel = mongoose.model("user", user);
const product = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  url: String,
  detailUrl: String,
  title: Object,
  quantity: Number,
  description: String,
  discount: String,
  tagline: String,
  images: [String], // Array of image URLs
});
const productModel = mongoose.model("product", product);

const seller = new Schema({
  email: { type: String, unique: true },
  mobile: { type: Number, unique: true },
  category: String,
  gstin: String,
  password: String,
  refreshToken: String,
  name: String,
});
const sellerModel = mongoose.model("seller", seller);

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { userModel, productModel, sellerModel,orderModel };

/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  name: String,
  refreshToken: String,
  Address: Array,
  phone: Number,
  Orders: Array,
  resetPasswordOTP: Number,
  resetPasswordExpires: Number,
  gender: {
    type: String,
    enum: ["male", "female", "others"], // Corrected enum definition
  },
});
const userModel = mongoose.model("user", user);
const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  discount: String,
  category: String,
  sellerId: { type: Schema.Types.ObjectId, ref: "Seller" }, // Reference to seller
  images: [String], // Array of image URLs
});

const productModel = mongoose.model("Product", productSchema);

// Seller Schema
const sellerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  mobile: { type: Number, unique: true },
  category: String,
  gstin: String,
  password: String,
  refreshToken: String,
  name: String,
});

const sellerModel = mongoose.model("Seller", sellerSchema);

// Order Schema
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { userModel, productModel, sellerModel, orderModel };
*/
