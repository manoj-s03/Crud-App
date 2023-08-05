import React from "react";
import "./RemoveProduct.css"; // Make sure to create this CSS file in the same directory

const RemoveProduct = ({ product, onProductRemoved, onCancel }) => {
  const handleRemove = () => {
    onProductRemoved(product._id);
  };

  return (
    <div className="overlay">
      <div className="remove-container">
        <h2 className="title">Confirm Removal</h2>
        <p className="message">Are you sure you want to remove this product?</p>
        <div className="button-group">
          <button onClick={onCancel} className="button cancel-button">
            Cancel
          </button>
          <button onClick={handleRemove} className="button remove-button">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveProduct;
