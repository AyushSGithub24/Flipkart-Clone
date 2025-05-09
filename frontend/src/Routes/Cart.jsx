import React, { useEffect, useCallback } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useAuth } from "../Contexts/AuthContext";
import { Minus, Plus, ShieldCheck } from "lucide-react";

function Cart() {
  const url = import.meta.env.VITE_API_BASE_URL;
  const { cart, accessToken, setCart } = useAuth();

  const getCartFromDB = useCallback(async () => {
    try {
      const response = await fetch(url + "/product/getCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
      const data = await response.json();
      setCart(data.cart);
      console.log("Cart inside fetch call", data.cart);
    } catch (error) {
      console.error("Error getting Cart data:", error);
    }
  }, [accessToken, setCart, url]);

  useEffect(() => {
    getCartFromDB();
  }, [getCartFromDB]);

  const safeCart = cart || [];

  const subtotal = safeCart.reduce(
    (total, item) =>
      total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const originalTotal = safeCart.reduce(
    (total, item) =>
      total + (item.productId?.cuttedPrice || 0) * (item.quantity || 0),0
    
  );

  const discount = originalTotal - subtotal;
  const discountPercentage =(product)=>{ 
    // console.log(product);
    let c= Math.round(
    ((product.cuttedPrice - product.price) / product.cuttedPrice) * 100
  );
  // console.log(c);
  return c;
}

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(`${url}/product/updateCartQuantity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      const data = await response.json();
      getCartFromDB()
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`${url}/product/removeItem/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });

      const data = await response.json();
      getCartFromDB()
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto p-4 bg-gray-50">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm order-1">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-medium text-gray-800">
              My Cart ({safeCart.length})
            </h2>
            <div className="flex gap-4 items-center">
              <span className="text-gray-600">From Saved Addresses</span>
              <button type="button" className="text-blue-500 whitespace-nowrap">
                Enter Delivery Pincode
              </button>
            </div>
          </div>

          {safeCart.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              Your cart is empty.
            </div>
          ) : (
            <div className="divide-y">
              {safeCart.map((item) => (
                <div key={item._id} className="p-4 flex flex-col">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.productId.images?.[0] || "/placeholder.svg"}
                        alt={item.productId.name || "Product image"}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.productId.name || "Unnamed Product"}
                      </h3>
                      {item.productId.color && (
                        <p className="text-gray-500">{item.productId.color}</p>
                      )}

                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-gray-600">
                          Seller: {item.productId.brand?.name || "Official"}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded flex items-center">
                          <span className="text-yellow-500 mr-0.5">★</span>
                          Assured
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-lg">
                          ₹{(item.productId?.price || 0).toLocaleString("en-IN")
                          }
                        </span>
                        {item.productId.price > 0 && (
                          <>
                            <span className="text-gray-500 line-through">
                              ₹
                              {item.productId.price.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                            <span className="text-green-600">
                              {discountPercentage(item.productId)}% off
                            </span>
                          </>
                        )}
                        <span className="text-green-600 flex items-center gap-1">
                          5 offers applied{" "}
                          <span className="inline-block w-4 h-4 bg-green-600 text-white rounded-full text-xs flex items-center justify-center">
                            i
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="w-48 text-right">
                      <p className="text-gray-700">
                        {/* Ideally calculate this date dynamically */}
                        Delivery by Tue May 24 |{" "}
                        <span className="text-green-600">Free</span>
                        {!item.productId.name?.includes("Gaana") && (
                          <span className="line-through text-gray-500 ml-1">
                            ₹40
                          </span>
                        )}
                      </p>
                      {!item.productId.name?.includes("Gaana") && (
                        <p className="text-gray-500 text-sm mt-1">
                          7 Days Replacement Policy
                        </p>
                      )}
                    </div>
                  </div>

                  {item.productId.price === 0 && (
                    <div className="mt-4 ml-28 text-sm text-gray-600">
                      <p>
                        • This item is added to your cart as part of a free
                        giveaway.
                      </p>
                      <p>Read more details in the order details page.</p>
                    </div>
                  )}

                  {!item.productId.name?.includes("Gaana") && (
                    <div className="mt-4 ml-28 flex items-center gap-4">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-10 text-center border-none"
                        />
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button type="button" className="text-gray-600 font-medium">
                        SAVE FOR LATER
                      </button>
                      <button
                        type="button"
                        className="text-gray-600 font-medium"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Details */}
        <div className="w-full lg:w-1/3 order-2 lg:order-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-gray-500 font-medium mb-4">PRICE DETAILS</h2>
            <div className="divide-y">
              <div className="py-3 flex justify-between">
                <span>Price ({safeCart.length} items)</span>
                <span>₹{originalTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="py-3 flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString("en-IN")}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="py-3 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{subtotal?.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <p className="text-green-600 py-3">
              You will save ₹{discount?.toLocaleString("en-IN")} on this order
            </p>
          </div>

          <div className="p-4 bg-gray-100 flex justify-end">
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-medium"
            >
              PLACE ORDER
            </button>
          </div>

          <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start gap-2">
              <ShieldCheck className="text-gray-500 mt-1" />
              <p className="text-gray-500">
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
