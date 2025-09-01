import {React, useEffect, useState} from 'react'
import Navbar from "./Navbar"

const AddInvoice = () => {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [cgst, setCGST] = useState(0);
  const [sgst, setSGST] = useState(0);
  const invoice = {
    invoiceNumber: 'INV-001',
    date: '2025-04-26',
    dueDate: '2025-05-10',
    billTo: {
      name: 'Jane Doe',
      address: '123 Main Street',
      city: 'Springfield',
      zip: '12345',
      country: 'USA'
    },
    items: [
      { description: 'Web Design', quantity: 1, unitPrice: 500 },
      { description: 'Hosting (3 months)', quantity: 1, unitPrice: 75 },
      { description: 'Domain Name (1 year)', quantity: 1, unitPrice: 15 }
    ],
    notes: 'Thank you for your business!'
  };

  useEffect(()=>{
    const sub = invoice.items.reduce((price, item) => price + item.quantity * item.unitPrice, 0);
    const cgstValue = sub * 0.03;
    const sgstValue = sub * 0.03;
    const totalAmount = sub + cgstValue + sgstValue;

    setTotal(sub);
    setSubTotal(totalAmount);
    setCGST(cgstValue);
    setSGST(sgstValue);
  });
  console.log(subtotal, total, cgst, sgst);
  invoice.items.map((item, index) =>{
    console.log(item.description)
  } )
  return (
    <>
    <Navbar />
      <h1>This is the Invoice Page!</h1>
      Company Name:
      <input type="text" />
      <br />
      Company Address:
      <textarea type="text" />
      <br />
      Billing to:
      <textarea type="text"></textarea>
      <br />
      Shipping to:
      <textarea type="text"></textarea>
      <br />
      invoice id:
      <p>e3432ThdKKadkjnnmm9384</p>
      Date:
      <input type="date" />
      <br />

      <div className="table">

      </div>








      <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Invoice</h2>
      <p><strong>Invoice #: </strong>{invoice.invoiceNumber}</p>
      <p><strong>Date: </strong>{invoice.date}</p>
      <p><strong>Due Date: </strong>{invoice.dueDate}</p>

      <h3>Bill To:</h3>
      <p>{invoice.billTo.name}</p>
      <p>{invoice.billTo.address}</p>
      <p>{invoice.billTo.city}, {invoice.billTo.zip}</p>
      <p>{invoice.billTo.country}</p>

      <h3>Items:</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc' }}>Description</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Quantity</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Unit Price</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>Rs.{item.unitPrice.toFixed(2)}</td>
              <td>Rs.{(item.quantity * item.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: 'right' }}>
        Total: Rs.{total.toFixed(2)}
        <br />
        CGST 3%: Rs.{cgst.toFixed(2)}
        <br />
        SGST 3%: Rs.{sgst.toFixed(2)}
        <br />
        SubTotal: Rs.{subtotal.toFixed(2)}
      </h3>
      <hr />
      <br /><br /><br /><br /><br /><br />








        <div>
          Id
          Name
          Description
          Quantity
          Unit Price
          Total
          <hr />

          <input type="number" name="" id="prod_id" />

          <button type="button" id="add_product">+</button>
          <button type="button" id="remove_product">-</button>
          <button type="button" id="add_items">Add Items</button>

          

        </div>

      <p><em>{invoice.notes}</em></p>
    </div>
          
    </>
  )
}

export default AddInvoice
