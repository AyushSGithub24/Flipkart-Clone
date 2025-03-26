import React, { useState } from 'react';

const AddProductForm = ({ onSubmit, onCancel }) => {
  const [newProduct, setNewProduct] = useState({
    quantity: 0,
    discount: "",
    name: "",
    highlights: [],
    specifications: [{ title: "", description: [{ key: "", value: "" }] }],
    price: 0,
    cuttedPrice: 0,
    images: [],
    brand: { name: "", logo: "" },
    category: "",
    tags: "",
    warranty: [],
    ratings: 0,
    numOfReviews: 0,
    reviews: [],
  });

  const [imageUploadMode, setImageUploadMode] = useState("file"); // "file" or "url"
  const [imageUrl, setImageUrl] = useState("");
  const [brandLogoMode, setBrandLogoMode] = useState("file"); // "file" or "url"
  const [brandLogoUrl, setBrandLogoUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("brand.")) {
      setNewProduct({
        ...newProduct,
        brand: { ...newProduct.brand, [name.split(".")[1]]: value },
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          brand: { ...newProduct.brand, logo: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrandLogoUrl = () => {
    if (brandLogoUrl.trim()) {
      setNewProduct({
        ...newProduct,
        brand: { ...newProduct.brand, logo: brandLogoUrl },
      });
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setNewProduct({ ...newProduct, images: [...newProduct.images, ...imageUrls] });
  };

  const handleImageUrl = () => {
    if (imageUrl.trim()) {
      setNewProduct({ ...newProduct, images: [...newProduct.images, imageUrl] });
      setImageUrl(""); // Clear the input after adding
    }
  };

  const handleSpecificationChange = (specIndex, field, value, descIndex = null) => {
    setNewProduct((prevProduct) => {
      const updatedSpecifications = prevProduct.specifications.map((spec, i) => {
        if (i === specIndex) {
          if (field === "title") {
            return { ...spec, title: value };
          } else if (field === "description" && descIndex !== null) {
            const updatedDescriptions = spec.description.map((desc, j) =>
              j === descIndex ? { ...desc, [value.key]: value.value } : desc
            );
            return { ...spec, description: updatedDescriptions };
          }
        }
        return spec;
      });

      return { ...prevProduct, specifications: updatedSpecifications };
    });
  };

  const addSpecification = () => {
    setNewProduct({
      ...newProduct,
      specifications: [...newProduct.specifications, { title: "", description: [{ key: "", value: "" }] }],
    });
  };

  const addSpecificationDetail = (specIndex) => {
    setNewProduct((prevProduct) => {
      const updatedSpecifications = prevProduct.specifications.map((spec, i) => {
        if (i === specIndex) {
          return {
            ...spec,
            description: [...spec.description, { key: "", value: "" }],
          };
        }
        return spec;
      });

      return { ...prevProduct, specifications: updatedSpecifications };
    });
  };

  const removeSpecificationDetail = (specIndex, descIndex) => {
    setNewProduct((prevProduct) => {
      const updatedSpecifications = prevProduct.specifications.map((spec, i) => {
        if (i === specIndex) {
          return {
            ...spec,
            description: spec.description.filter((_, j) => j !== descIndex),
          };
        }
        return spec;
      });

      return { ...prevProduct, specifications: updatedSpecifications };
    });
  };

  const removeSpecification = (specIndex) => {
    setNewProduct({
      ...newProduct,
      specifications: newProduct.specifications.filter((_, i) => i !== specIndex),
    });
  };

  const addHighlight = () => {
    setNewProduct({ ...newProduct, highlights: [...newProduct.highlights, ""] });
  };

  const removeHighlight = (index) => {
    setNewProduct({
      ...newProduct,
      highlights: newProduct.highlights.filter((_, i) => i !== index),
    });
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...newProduct.highlights];
    updatedHighlights[index] = value;
    setNewProduct({ ...newProduct, highlights: updatedHighlights });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newProduct);
    // // setNewProduct({
    //   quantity: 0,
    //   discount: "",
    //   name: "",
    //   highlights: [],
    //   specifications: [{ title: "", description: [{ key: "", value: "" }] }],
    //   price: 0,
    //   cuttedPrice: 0,
    //   images: [],
    //   brand: { name: "", logo: "" },
    //   category: "",
    //   tags: "",
    //   warranty: [],
    //   ratings: 0,
    //   numOfReviews: 0,
    //   reviews: [],
    // // })
  };

  const removeImage = (index) => {
    setNewProduct({
      ...newProduct,
      images: newProduct.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Add New Product</h3>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Inputs */}
          {[{ label: "Product Name", name: "name", type: "text" },
            { label: "Price (₹)", name: "price", type: "number" },
            { label: "Cutted Price (₹)", name: "cuttedPrice", type: "number" },
            {label: "Discount %", name: "discount", type: "number"},
            { label: "Quantity", name: "quantity", type: "number" },
            { label: "Brand Name", name: "brand.name", type: "text" },
            { label: "Category", name: "category", type: "text" },
            { label: "Tags (comma separated)", name: "tags", type: "text" }].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label} </label>
              <input
                type={type}
                name={name}
                value={name.startsWith("brand.") ? newProduct.brand[name.split(".")[1]] : newProduct[name]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}

          {/* Brand Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Logo *</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setBrandLogoMode("file")}
                className={`px-3 py-1 text-sm ${brandLogoMode === "file" ? "bg-indigo-600 text-white" : "bg-gray-200"} rounded-md`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setBrandLogoMode("url")}
                className={`px-3 py-1 text-sm ${brandLogoMode === "url" ? "bg-indigo-600 text-white" : "bg-gray-200"} rounded-md`}
              >
                Enter URL
              </button>
            </div>

            {brandLogoMode === "file" ? (
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required={!newProduct.brand.logo}
              />
            ) : (
              <div className="flex-col gap-2">
                <input
                  type="url"
                  placeholder="Enter logo URL"
                  value={brandLogoUrl}
                  onChange={(e) => setBrandLogoUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required={!newProduct.brand.logo}
                />
                <button
                  type="button"
                  onClick={handleBrandLogoUrl}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Add
                </button>
              </div>
            )}

            {newProduct.brand.logo && (
              <div className="mt-2">
                <img src={newProduct.brand.logo} alt="Brand Logo" className="h-16 w-16 object-contain rounded-md border border-gray-300" />
              </div>
            )}
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Images *</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setImageUploadMode("file")}
                className={`px-3 py-1 text-sm ${imageUploadMode === "file" ? "bg-indigo-600 text-white" : "bg-gray-200"} rounded-md`}
              >
                Upload Files
              </button>
              <button
                type="button"
                onClick={() => setImageUploadMode("url")}
                className={`px-3 py-1 text-sm ${imageUploadMode === "url" ? "bg-indigo-600 text-white" : "bg-gray-200"} rounded-md`}
              >
                Enter URLs
              </button>
            </div>

            {imageUploadMode === "file" ? (
              <input
                type="file"
                multiple
                onChange={handleImagesUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required={newProduct.images.length === 0}
              />
            ) : (
              <div className="flex-col gap-2">
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required={newProduct.images.length === 0}
                />
                <button
                  type="button"
                  onClick={handleImageUrl}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Add
                </button>
              </div>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
              {newProduct.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt={`Preview ${index}`} className="h-16 w-16 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Specifications *</label>
            {newProduct.specifications.map((spec, specIndex) => (
              <div key={specIndex} className="border p-2 rounded-md mb-2">
                <input
                  type="text"
                  placeholder="Specification Title"
                  value={spec.title}
                  onChange={(e) => handleSpecificationChange(specIndex, "title", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full mb-2"
                  required
                />

                {spec.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex-col gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Key"
                      value={desc.key}
                      onChange={(e) =>
                        handleSpecificationChange(specIndex, "description", { key: "key", value: e.target.value }, descIndex)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={desc.value}
                      onChange={(e) =>
                        handleSpecificationChange(specIndex, "description", { key: "value", value: e.target.value }, descIndex)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecificationDetail(specIndex, descIndex)}
                      className="text-red-500 px-2 py-1 "
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addSpecificationDetail(specIndex)}
                  className="text-blue-500 px-3 py-1 border border-blue-500 rounded-md text-sm"
                >
                  + Add Key-Value
                </button>
                <button
                  type="button"
                  onClick={() => removeSpecification(specIndex)}
                  className="text-red-500 px-3 py-1 border border-red-500 rounded-md text-sm m-1 "
                >
                  Remove Specification
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addSpecification}
              className="text-blue-500 px-3 py-1 border border-blue-500 rounded-md text-sm mt-2"
            >
              + Add Specification
            </button>
          </div>

          {/* Highlights */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Highlights *</label>
            <div className="space-y-4">
              {newProduct.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex-col items-center gap-4 bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200"
                >
                  <input
                    type="text"
                    placeholder={`Highlight ${index + 1}`}
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addHighlight}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              + Add Highlight
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;