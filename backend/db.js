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
/*
 id: 'product1',
        url: 'https://rukminim1.flixcart.com/image/150/150/kapoo7k0/electric-kettle/p/6/s/pigeon-favourite-original-imafs7xhj5uwgrh4.jpeg?q=70', 
        detailUrl: 'https://rukminim1.flixcart.com/image/416/416/kapoo7k0/electric-kettle/p/6/s/pigeon-favourite-original-imafs7xhj5uwgrh4.jpeg?q=70',
        title: {
            shortTitle: 'Home & Kitchen',
            longTitle: 'Pigeon FAVOURITE Electric Kettle  (1.5 L, Silver, Black)'
        }, 
        price: {
            mrp: 1195,
            cost: 625,
            discount: '47%'
        },
        quantity: 1,
        description: 'This electric kettle from Pigeon will soon become a travelers best friend, a hostelite saviour and an answer to all the midnight cravings. With this handy appliance, you can boil water and use it to make instant noodles, packet soup, coffee and green tea.',
        discount: 'Extra 10% Off', 
        tagline: 'Deal of the day'
*/
const product =new Schema({
  id:{
    type:String,
    required:true,
    unique:true
  },
  url:String,
  detailUrl:String,
  title:Object,
  quantity:Number,
  description:String,
  discount:String,
  tagline:String,
})
const productModel=mongoose.model("product",product)
module.exports={userModel,productModel};

