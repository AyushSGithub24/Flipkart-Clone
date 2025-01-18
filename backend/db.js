const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const user=new Schema({
    email: String,
    password:String,
    googleId:String,
    name:String
    // Orders:Array,
    // Cart:Array
})

const userModel=mongoose.model("user",user);

module.exports={userModel};

