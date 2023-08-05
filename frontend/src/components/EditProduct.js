import React, { useState } from "react";
import axios from "axios";
import "./EditProduct.css"; // Make sure to create this CSS file in the same directory

const EditProduct = ({ product, onProductEdited, onCancel }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/${product._id}`,
        {
          name,
          description,
        }
      );
      onProductEdited(response.data);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="edit-container">
        <h2 className="title">Edit Product</h2>
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
          <div className="button-group">
            <button onClick={handleEditProduct} className="button save-button">
              Save
            </button>
            <button onClick={onCancel} className="button cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
