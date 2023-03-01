import React from "react";
import "./AddToCartButton.css";

function AddToCartButton({ product, addToCart }) {
  return (
    <button className="add-to-cart-button"
    onClick={() => addToCart(product)}
    >
    <span>Add to Cart</span>
    </button>
  );
}

export default AddToCartButton;
