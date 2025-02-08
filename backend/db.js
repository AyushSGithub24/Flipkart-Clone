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
});
const productModel = mongoose.model("product", product);

const seller=new Schema({
  email: { type: String, unique: true },
  mobile:{type:Number, unique:true },
  category:String,
  gstin :String,
  password: String,
  refreshToken: String,
})
const sellerModel=mongoose.model("seller",seller)


module.exports = { userModel, productModel,sellerModel };
