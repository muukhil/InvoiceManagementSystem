import React from "react";
import { useCart } from "../CartContext.jsx";
import jsPDF from "jspdf";

const Cart = () => {
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 10);
    let y = 30;

    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - Qty: ${item.quantity} - Rs.${item.price * item.quantity}`, 10, y);
      y += 10;
    });

    doc.text(`Total Amount: Rs.${total}`, 10, y + 10);
    doc.save("invoice.pdf");
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <table border="1" cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price (Rs.)</th>
              <th>Total (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total Amount: Rs.{total}</h3>
      <button onClick={generateInvoice}>Generate Invoice</button>
    </div>
  );
};

export default Cart;
