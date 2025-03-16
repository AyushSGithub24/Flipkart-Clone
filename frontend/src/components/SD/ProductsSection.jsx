import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductsTable from './ProductsTable';
import AddProductForm from './AddProductForm';
import { productsList } from './data/constants';

const ProductsSection = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [products, setProducts] = useState(productsList);

  const handleAddProduct = (newProduct) => {
    // Here you would typically send the data to an API
    // For now, we'll just add it to our local state
    const productWithId = {
      ...newProduct,
      id: products.length + 1,
      image: '/api/placeholder/100/100',
      sales: 0,
      rating: 0
    };
    
    setProducts([...products, productWithId]);
    setShowAddProductForm(false);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Products</h2>
        <button
          onClick={() => setShowAddProductForm(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <Plus size={18} className="mr-1" />
          Add New Product
        </button>
      </div>
      
      {showAddProductForm && (
        <AddProductForm 
          onSubmit={handleAddProduct} 
          onCancel={() => setShowAddProductForm(false)} 
        />
      )}
      
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsSection;