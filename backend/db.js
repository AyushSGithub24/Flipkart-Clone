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
  Orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  resetPasswordOTP: Number,
  resetPasswordExpires: Number,
  gender: {
    type: String,
    enum: ["male", "female", "others"], // Corrected enum definition
  },
  Cart:[
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, min: 1 },
    }
  ]
});
const userModel = mongoose.model("user", user);

const productSchema = new Schema({
  url: String,
  detailUrl: String,
  title: { type: Object},
  quantity: { type: Number, min: 0 },
  description: {
    type: String,
  }, // Removed duplicate
  discount: String,
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  tags:String,
  highlights: [{ type: String, required: true }],
  specifications: [
    {
      title: { type: String, required: true },
      description: [{ key:String, value:String}],
    },
  ],
  //specifications[0].description[0].value
  price: { type: Number, required: [true, "Please enter product price"] },
  cuttedPrice: { type: Number, required: [true, "Please enter cutted price"] },
  images: [String],
  brand: {name: String,logo: String},
  category: { type: String, required: [true, "Please enter product category"] },
  warranty: { type: Number, default: 1 },
  ratings: { type: Number, default: 0, min: 0, max: 5 }, // Validation added
  numOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      rating: { type: Number, min: 0, max: 5 },
      comment: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
const productModel = mongoose.model("Product", productSchema);

const sellerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  mobile: { type: Number, unique: true, required: true },
  category: String,
  gstin: String,
  password: { type: String, required: true },
  refreshToken: String,
  name: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});
const sellerModel = mongoose.model("Seller", sellerSchema);

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ], 
  totalAmount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
const orderModel = mongoose.model("Order", orderSchema);

module.exports = { userModel, productModel, sellerModel, orderModel };
