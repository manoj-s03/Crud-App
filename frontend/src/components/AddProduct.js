import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api", {
        name,
        description,
      });
      onProductAdded(response.data);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add Product</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={handleNameChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Product Description"
          value={description}
          onChange={handleDescriptionChange}
          className="input"
        />
        <button onClick={handleAddProduct} className="button">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
