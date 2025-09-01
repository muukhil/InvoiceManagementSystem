import React from 'react';
import '../CSS/ViewInvoiceModal.css';

const ViewInvoiceModal = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const {
    client,
    invoiceNumber,
    billingAddress,
    shippingAddress,
    items,
    issueDate,
    dueDate,
    cgst,
    sgst,
    totalAmount
  } = invoice;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>

        <h1>Invoice Details</h1>

        <div className="top-section">
          <div className="customer-info">
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phoneNumber}</p>
            <p><strong>Address:</strong> {client.address}</p>
          </div>

          <div className="invoice-info">
            <p><strong>Invoice No:</strong> {invoiceNumber}</p>
            <p><strong>Issue Date:</strong> {new Date(issueDate).toLocaleDateString('en-GB')}</p>
            <p><strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString('en-GB')}</p>
          </div>
        </div>

        <div className="address-info">
          <p><strong>Billing Address:</strong> {billingAddress}</p>
          <p><strong>Shipping Address:</strong> {shippingAddress}</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>Rs.{item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <p><strong>Subtotal:</strong> Rs.{subtotal.toFixed(2)}</p>
          <p><strong>CGST ({cgst}%):</strong> Rs.{(subtotal * cgst / 100).toFixed(2)}</p>
          <p><strong>SGST ({sgst}%):</strong> Rs.{(subtotal * sgst / 100).toFixed(2)}</p>
          <p><strong>Total:</strong> Rs.{totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;