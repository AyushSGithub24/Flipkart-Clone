import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProductsTable from "./ProductsTable";
import AddProductForm from "./AddProductForm";
import { buttonBaseClasses } from "@mui/material";

const ProductsSection = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("SellerAccessToken");
    try {
      const response = await fetch("http://localhost:3000/seller/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const body = await response.json();
      if (response.ok) {
        setProducts(body.products);
      } else {
        console.error("Error fetching products: ", body.message);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    const token = localStorage.getItem("SellerAccessToken");

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("cuttedPrice", newProduct.cuttedPrice);
    formData.append("brand", newProduct.brand);
    formData.append("tags", newProduct.tags);
    formData.append("discount", newProduct.discount);
    formData.append("quantity", newProduct.quantity);
    formData.append("category", newProduct.category);

    // ✅ Convert highlights and specifications into JSON strings
    formData.append("highlights", JSON.stringify(newProduct.highlights));
    formData.append("specifications", JSON.stringify(newProduct.specifications));

    // ✅ Process images (Blob URLs → Files)
    const imageFiles = await Promise.all(
        newProduct.images.map(async (image, index) => {
            if (image.startsWith("blob:")) {
                const response = await fetch(image); // Fetch Blob data
                const blob = await response.blob(); // Convert to Blob
                return new File([blob], `image${index}.png`, { type: blob.type }); // Create File
            }
            return image; // Already a Cloudinary URL, keep it as is
        })
    );

    // ✅ Append files to formData
    imageFiles.forEach((file) => {
        if (typeof file === "string") {
            formData.append("existingImages", file); // Send Cloudinary URLs separately
        } else {
            formData.append("images", file); // Append actual file
        }
    });

    try {
        const response = await fetch("http://localhost:3000/seller/product/add", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Remove 'Content-Type', let FormData handle it
            },
            body: formData,
        });

        const body = await response.json();
        if (response.ok) {
            setProducts([...products, body.product]);
            setShowAddProductForm(false);
        } else {
            console.error("Error adding product: ", body.message);
        }
    } catch (error) {
        console.error("Error adding product: ", error);
    }
};


  const handleUpdateProduct = async (productId, updatedData) => {
    const token = localStorage.getItem("SellerAccessToken");
    try {
      const response = await fetch(
        `http://localhost:3000/seller/product/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );
      const body = await response.json();
      if (response.ok) {
        setProducts(
          products.map((product) =>
            product._id === productId ? body.product : product
          )
        );
      } else {
        console.error("Error updating product: ", body.message);
      }
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem("SellerAccessToken");
    try {
      const response = await fetch(
        `http://localhost:3000/seller/product/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const body = await response.json();
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error("Error deleting product: ", body.message);
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
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

      <ProductsTable
        products={products}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />

      {/* <ButtonAddContent  reload={fetchProducts} /> */}
    </div>
  );
};

export default ProductsSection;



// function ButtonAddContent({reload}) {
//   const [data, setData] = useState([]);

//   const handelonclick = async (e)=>{
//     e.preventDefault();
//     (() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/public/tv.txt"); // ✅ Corrected path
//         const text = await response.text(); 
//         const jsonData = JSON.parse(text);
//         console.log(jsonData);
//         setData(jsonData);

//         // Upload products one by one
//         for (let i of jsonData) {
//           try {
//             const res=await putData(i);
//             if(res){
//             console.log("Product added:", i.name);
//             reload()
//             // Wait for 5 seconds before processing the next product
//             await new Promise((resolve) => setTimeout(resolve, 2000));}
//             else{
//               console.log("break");
//               break;
//             }
//           } catch (err) {
//             console.error("Failed to add product:", i.name, err);
//           }
//         }
//       } catch (error) {
//         console.error("Error reading file:", error);
//       }
//     };

//     fetchData();
//   })();
// };

//   return <button onClick={handelonclick}>Submit</button>;
// }

// const putData = async (newProduct) => {
//   const token = localStorage.getItem("SellerAccessToken");
//   // Convert price & cuttedPrice to number
//   const price = Number(newProduct.price.replace(/[^0-9]/g, ""));
//   const cuttedPrice = Number(newProduct.cuttedPrice.replace(/[^0-9]/g, ""));
//   const formData = new FormData();
//   formData.append("name", newProduct.name);
//   formData.append("price", price);
//   formData.append("cuttedPrice", cuttedPrice);
//   formData.append("brand", JSON.stringify({ name: newProduct.name.split(" ")[0], logo: newProduct.brandImg }));
//   formData.append("tags", `laptop,laptops,${newProduct.name.split(" ")[0]}`);
//   formData.append("discount", "0");
//   formData.append("quantity", "1000");
//   formData.append("category", "Electronics");
//   formData.append("highlights", JSON.stringify(newProduct.highlights));
//   // Ensure `specifications` is a valid JSON string
//   // const specifications = {
//   //   title: "General",
//   //   description:JSON.parse(newProduct.specification.replace(/\\\//g, "")) , // ✅ Ensure this is an array of objects
//   // };
//   // formData.append("specifications", JSON.stringify(specifications));
//   // formData.append("specifications", specifications);
//   const cleanedSpecs = cleanJSONString(`[{"title":"General","description":${JSON.stringify(JSON.parse(newProduct.specification.replace(/\\\//g, "")))}}]`);
//   // console.log(cleanedSpecs[0]?.description);
//   let arr=cleanedSpecs[0]?.description;
//   let newarr=[]
//   for(let i of arr){
//     for(let j in i){
//       // console.log("key="+j+" value="+i[j]);
//       newarr.push({"key":j,"value":i[j]})
//     }
//   }
//   let newCleanedSpecs=cleanJSONString(`[{"title":"General","description":${JSON.stringify(newarr)}}]`)
//   if (newCleanedSpecs) {
//       formData.append("specifications", JSON.stringify(newCleanedSpecs));
//   } else {
//       console.error("Skipping invalid specifications");
//   }

//   for (let file of newProduct.images) {
//     formData.append("existingImages", file);
//   }
//   console.log(formData)
//   try {
//     const response = await fetch("http://localhost:3000/seller/product/add", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`, // ✅ No 'Content-Type', let FormData handle it
//       },
//       body: formData,
//     });

//     const body = await response.json();
//     if (response.ok) {
//       console.log("Product added successfully:", body);
//       return true;
//     } else {
//       console.error("Error adding product:", body.message);
//       return false;
//     }
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return false;
//   }
// };

// const cleanJSONString = (jsonStr) => {
//   try {
//     // Remove unnecessary whitespace and validate JSON
//     const parsed = JSON.parse(jsonStr.trim());
//     return parsed; // Return valid parsed JSON
//   } catch (error) {
//     console.error("Invalid JSON:", error);
//     return null; // Return null if JSON is invalid
//   }
// };
