import React from "react";
import { useCart } from "../CartContext";

const AddToCart = ({ item }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find((i) => i.name === item.name) || { quantity: 0 };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
      <button onClick={() => removeFromCart(item.name)} disabled={cartItem.quantity === 0}>-</button>
      <span>{cartItem.quantity}</span>
      <button onClick={() => addToCart(item)} disabled={cartItem.quantity >= 10}>+</button>
    </div>
  );
};

export default AddToCart;