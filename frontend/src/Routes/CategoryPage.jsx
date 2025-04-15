import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function CategoryPage() {
  const location = useLocation();
  const { title = "Category", products = [] } = location.state || {}; // Default values to prevent errors


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((value, idx) => (
              <Card product={value} key={value.id || idx} />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const Card = ({ product }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const temp = product || { price: 0 };

  return (
    <Link
      to="/productDetail"
      state={{ products: temp }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 block"
    >
      <div className="relative">
        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        )}
        <img
          src={product?.images?.[0].replace("/128/128/","/500/500/") || "/fallback-image.jpg"} // Fallback image
          alt={product?.name || "Product Image"}
          className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product?.name || "Product Name"}
        </h2>
        <p className="text-sm text-green-600 font-medium">
          {Number(temp.price).toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          })}
        </p>
      </div>
    </Link>
  );
};

export default CategoryPage;
