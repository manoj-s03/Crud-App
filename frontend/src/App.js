import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import RemoveProduct from "./components/RemoveProduct";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product._id === editedProduct._id ? editedProduct : product
    );
    setProducts(updatedProducts);
    setSelectedProduct(null);
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      setSelectedProduct(null);
      setIsRemoveModalOpen(false);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="app-title">Product Description App</h1>
      <AddProduct onProductAdded={handleProductAdded} />
      <div className="product-list">
        <h2 className="list-title">Product List</h2>
        <table className="list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsRemoveModalOpen(true);
                    }}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && !isRemoveModalOpen && (
        <EditProduct
          product={selectedProduct}
          onProductEdited={handleEditProduct}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
      {isRemoveModalOpen && (
        <RemoveProduct
          product={selectedProduct}
          onProductRemoved={handleRemoveProduct}
          onCancel={() => {
            setIsRemoveModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
