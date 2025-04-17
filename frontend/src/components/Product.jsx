import React, { useState } from "react";
import {
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  Info,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function Product({ product }) {
  const [mainImage, setMainImage] = React.useState(product.images[0]);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [showCategoryDescription, setCategoryDescription] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(true);
  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.cuttedPrice - product.price) / product.cuttedPrice) * 100
  );
  const url=import.meta.env.VITE_API_BASE_URL;
  // Display only first 3 highlights by default
  const displayHighlights = showAllHighlights
    ? product.highlights
    : product.highlights.slice(0, 3);
  const navigate=useNavigate();  

    const { isLoggedIn,accessToken }=useAuth();

  function addToCart(){
    if(!isLoggedIn){
      navigate("/login")
    }else{
      addCart(product,1);
      navigate("/cart")
    }
  }
  
  const addCart=async (product,quantity) => {
    try {
      const response=await fetch(`${url}/product/addToCart/${product._id}/${quantity}`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // Include token if available
        },
      });
      const data=await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding to Cart",error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      {/* Product Header - Mobile */}
      <div className="md:hidden mb-4">
        <h1 className="text-xl font-medium text-gray-800">{product.name}</h1>
        <div className="flex items-center mt-1 space-x-2">
          <div className="flex items-center bg-green-700 text-white px-2 py-0.5 rounded text-sm">
            <span className="font-semibold mr-1">0</span>
            <Star className="w-3 h-3 fill-white" />
          </div>
          <span className="text-gray-500 text-sm">
            {product.numOfReviews} Reviews
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Images */}
        <div className="md:w-2/5">
          <div className="sticky top-20">
            <div className="flex flex-col">
              {/* Main Image */}
              <div className="border rounded-lg p-4 mb-4 relative">
                <img
                  src={mainImage.replace("/128/128/","/500/500/") || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white">
                  <Heart className="w-5 h-5 text-gray-500" />
                </button>
                <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                  Summer Specials
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex overflow-x-auto gap-2 pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`min-w-16 h-16 border rounded p-1 ${
                      img === mainImage ? "border-blue-500" : "border-gray-200"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - view ${index + 1}`}
                      width={60}
                      height={60}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center" onClick={()=>{
                  addToCart()
                }} >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  ADD TO CART
                </button>
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="md:w-3/5">
          {/* Product Header - Desktop */}
          <div className="hidden md:block mb-4">
            <h1 className="text-2xl font-medium text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex items-center bg-green-700 text-white px-2 py-0.5 rounded text-sm">
                <span className="font-semibold mr-1">{product.ratings}</span>
                <Star className="w-3 h-3 fill-white" />
              </div>
              <span className="text-gray-500 text-sm">
                {product.numOfReviews} Reviews
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold">
                {Number(product.price).toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                  style: "currency",
                  currency: "INR",
                })}
              </span>
              <span className="text-gray-500 line-through text-lg">
                ₹{product.cuttedPrice.toLocaleString()}
              </span>
              <span className="text-green-600 font-medium">
                {discountPercentage}% off
              </span>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              + ₹59 Secured Packaging Fee
            </p>
          </div>

          {/* Available Offers */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Available offers</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="text-green-600 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Bank Offer</span> 5% Unlimited
                  Cashback on Flipkart Axis Bank Credit Card{" "}
                  <span className="text-blue-600">T&C</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-600 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Bank Offer</span> ₹2000 Off On
                  All Banks Credit and Debit Card Transactions{" "}
                  <span className="text-blue-600">T&C</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-600 mr-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">No cost EMI ₹2,084/month.</span>{" "}
                  Standard EMI also available{" "}
                  <span className="text-blue-600 flex items-center">
                    View Plans <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Highlights</h2>
            <ul className="list-disc pl-5 space-y-1">
              {displayHighlights.map((highlight, index) => (
                <li key={index} className="text-gray-700">
                  {highlight}
                </li>
              ))}
            </ul>
            {product.highlights.length > 3 && (
              <button
                className="text-blue-600 mt-2 flex items-center"
                onClick={() => setShowAllHighlights(!showAllHighlights)}
              >
                {showAllHighlights ? "View Less" : "View More"}
                {showAllHighlights ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </button>
            )}
          </div>

          {/* Warranty */}
          <div className="flex items-center mb-6 p-3 rounded-md">
            <div className=" p-1 rounded-md mr-3">
              <img
                src={product.brand.logo || "/placeholder.svg"}
                alt={product.brand.name}
                width="100px"
                height="60px"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                1 Year Warranty on Product
                <span className="text-blue-600 ml-2">Know More</span>
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <button
              className="flex items-center justify-between w-full py-3 border-b text-xl font-medium"
              onClick={() => setShowSpecifications(!showSpecifications)}
            >
              <span>Specifications</span>
              {showSpecifications ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {showSpecifications && (
              <div className="mt-4">
                {product.specifications.map((category) => (
                  <div key={category._id} className="mb-6">
                    <h3 className="text-lg font-medium mb-4">
                      {category.title}
                    </h3>
                    <div className="space-y-4">
                      {(showCategoryDescription
                        ? category.description
                        : category.description.slice(0, 5)
                      ).map((item) => (
                        <div key={item._id} className="grid grid-cols-3 gap-4">
                          <div className="text-gray-600">{item.key}</div>
                          <div className="col-span-2">{item.value}</div>
                        </div>
                      ))}
                    </div>
                    {category.description.length > 5 && (
                      <button
                        className="text-blue-600 mt-4"
                        onClick={() => setCategoryDescription((prev) => !prev)}
                      >
                        {showCategoryDescription ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ratings & Reviews */}
          <div className="mb-6">
            <button className="flex items-center justify-between w-full py-3 border-b text-xl font-medium">
              <span>Ratings & Reviews</span>
              <ChevronDown className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <div className="text-3xl font-semibold mr-2">4.1★</div>
                <div className="text-sm text-gray-500">
                  4,911 Ratings &<br />
                  552 Reviews
                </div>
              </div>
              <button className="px-4 py-2 border rounded-md text-sm">
                Rate Product
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center">
                  <span className="text-lg font-semibold">4.2</span>
                </div>
                <span className="text-sm mt-2">Cooling</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center">
                  <span className="text-lg font-semibold">4.0</span>
                </div>
                <span className="text-sm mt-2">Energy Efficiency</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center">
                  <span className="text-lg font-semibold">4.1</span>
                </div>
                <span className="text-sm mt-2">Design & Features</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center">
                  <span className="text-lg font-semibold">3.7</span>
                </div>
                <span className="text-sm mt-2">Delivery & Installation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
