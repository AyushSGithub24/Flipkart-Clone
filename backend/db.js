const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const user = new Schema({
    email: {type:String ,unique:true},
    password: String,
    googleId: String,
    name: String,
    refreshToken: String,
    Address: Array,
    phone: Number,
    Orders: Array,
    resetPasswordOTP:Number,
    resetPasswordExpires:Number,
    gender: {
      type: String,
      enum: ["male", "female", "others"],  // Corrected enum definition
    },
  });
const userModel=mongoose.model("user",user);

module.exports={userModel};

