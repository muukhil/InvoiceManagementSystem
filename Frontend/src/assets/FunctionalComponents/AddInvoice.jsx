import {React, useEffect, useState} from 'react'
import axios from "axios";
import Navbar from "./Navbar"
import "../CSS/AddInvoice.css"

const AddInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [client, setClient] = useState({ name: '', email: '', phoneNumber: '', address: '' });

  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [cgst, setCgst] = useState(3);
  const [sgst, setSgst] = useState(3);

  const [subtotal, setSubtotal] = useState(0);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  //Date and time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // updates every second

    return () => clearInterval(timer); // cleanup
  }, []);

  //update date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // format as yyyy-mm-dd
    setIssueDate(today);
  }, []);


  // Fetch inventory
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/getinventorydet');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
    const id = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    setInvoiceNumber(id);
  }, []);

  const addProductToInvoice = (product) => {
    console.log("Trying to add:", product._id, product.name);
    console.log("Current items in cart:", items);


    items.forEach(item => {
      console.log("Existing item:", item.productid, item.name);
    });
    const existing = items.find(item => item.productId === product.id);

    console.log("existing", existing);
    if (existing) {
      const updatedItems = items.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setItems(updatedItems);
    } else {
      setItems([...items, { 
        productId: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }]);
    }
    setShowPopup(false);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };


  const updateQuantity = (index, qty) => {
    const updated = [...items];
    updated[index].quantity = qty;
    setItems(updated);
  };

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    setSubtotal(total);
  }, [items]);

  const totalTax = (subtotal * (cgst + sgst)) / 100;
  const totalAmount = subtotal + totalTax;

  const handleSubmit = async () => {
    const invoiceData = {
      invoiceNumber,
      client,
      billingAddress,
      shippingAddress,
      items,
      totalAmount,
      cgst,
      sgst,
      issueDate,
      dueDate
    };

    const res = await axios.post('http://localhost:5000/addinvoice', invoiceData);
    alert(res.data.message || "Invoice Created");
  };

  return (
    <>
      <Navbar />
      <div className="add-invoice-container">
      <h1>Invoice Generator</h1>

      <div className="top-section">
        {/* Left: Customer Info */}
        <div className="customer-info">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Customer Email</label>
            <input
              value={client.email}
              onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              value={client.phoneNumber}
              onChange={(e) => setClient({ ...client, phoneNumber: e.target.value })}
            />
          </div>
        </div>

        {/* Right: Invoice Info */}
        <div className="invoice-info">
          <div className="header-time-display">
            <span className="clock-icon">🕒</span>
            <strong>{currentDateTime.toLocaleString()}</strong>
          </div>
          <p>Invoice #: {invoiceNumber}</p>
          <label>Issue Date</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>


      <div className="form-group">
        <label>Customer Address</label>
        <textarea value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} />
      </div>

      <div className="form-group">
        <label>Billing Address</label>
        <textarea value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Shipping Address</label>
        <textarea value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
      </div>

      <button onClick={() => setShowPopup(true)}>Add Product</button>

      {showPopup && (
        <div className="popup">
          <h3>Select a product</h3>
          {products.map(p => (
            <div key={p._id} onClick={() => addProductToInvoice(p)}>
              {p.name} - Rs.{p.price}
            </div>
          ))}
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}

      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx}>
            <td>{item.name}</td>
            <td>Rs.{item.price}</td>
            <td>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(idx, Number(e.target.value))}
              />
            </td>
            <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
            <td>
              <button
                onClick={() => removeItem(idx)}
                title="Delete this item"
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "16px"
                }}
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>



      <h3>Subtotal: Rs.{subtotal.toFixed(2)}</h3>

      <div className="form-group">
        <label>CGST %</label>
        <input type="number" value={cgst} onChange={(e) => setCgst(Number(e.target.value))} />
      </div>

      <div className="form-group">
        <label>SGST %</label>
        <input type="number" value={sgst} onChange={(e) => setSgst(Number(e.target.value))} />
      </div>

      <h3>Total: Rs.{totalAmount.toFixed(2)}</h3>

      <button onClick={handleSubmit}>Create Invoice</button>
    </div>

    </>

    
  );
}

export default AddInvoice