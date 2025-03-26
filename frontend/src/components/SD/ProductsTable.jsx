import React, { useState } from 'react';
import ProductSalesChart from './ProductSalesChart';

const ProductsTable = ({ products, onUpdate, onDelete }) => {
  const [activeProductId, setActiveProductId] = useState(null);

  // Function to truncate long product names
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sales</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* Product Image */}
                      <div className="h-12 w-12 flex-shrink-0">
                        <img 
                          className="h-12 w-12 rounded-md object-cover" 
                          src={product.images[0]} 
                          alt={product.name} 
                        />
                      </div>
                      {/* Product Name */}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900" title={product.name}>
                          {truncateText(product.name.split("-")[0],30)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm font-semibold">
                    ₹{Number(product.price).toLocaleString()}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">
                    {product.quantity}
                  </td>

                  {/* Sales */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">
                    {product.sales}
                    <button 
                      className="ml-2 text-blue-600 hover:text-blue-800 text-xs transition"
                      onClick={() => setActiveProductId(activeProductId === product._id ? null : product._id)}
                    >
                      {activeProductId === product._id ? 'Hide' : 'View trends'}
                    </button>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm">
                    {product.rating} ★
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 font-medium transition"
                      onClick={() => onUpdate(product._id)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 font-medium transition"
                      onClick={() => onDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Product Sales Chart (Expandable) */}
                {activeProductId === product._id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <ProductSalesChart product={product} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
