import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios';
import ViewInvoiceModal from './ViewInvoiceModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const Invoice = () => {
  const [entries, setEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewInvoice, setViewInvoice] = useState(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error('Error loading invoices:', err);
    }
  };

  // Filter by search query
  const filteredInvoices = invoices.filter((inv) =>
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteInvoice = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/invoices/by-number/${invoiceToDelete.invoiceNumber}`);
      setInvoices(prev => prev.filter(inv => inv.invoiceNumber !== invoiceToDelete.invoiceNumber));
      setInvoiceToDelete(null);
    } catch (err) {
      console.error("Failed to delete invoice:", err);
      alert("Could not delete invoice");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: '20px' }}>
        <Link to="/addinvoice">
          <button style={{ marginBottom: '15px' }}>Create New Invoice</button>
        </Link>

        {/* Top controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          {/* Dropdown - left */}
          <div>
            Show{' '}
            <select value={entries} onChange={(e) => setEntries(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{' '}
            entries
          </div>

          {/* Search bar - right */}
          <div>
            Search:{' '}
            <input
              type="text"
              placeholder="Invoice Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '4px', width: '200px' }}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: "rgba(255, 0, 0, 0.05)",
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          padding: '20px',
          overflowX: 'auto'
        }}>
          <table border="1" cellPadding="10" width="100%" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ backgroundColor: '#f8f8f8' }}>
              <tr>
                <th>Invoice ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>{inv.invoiceNumber}</td>
                    <td>{inv.client.name}</td>
                    {/* <td>{inv.issueDate}</td> */}
                    <td>{new Date(inv.issueDate).toLocaleDateString('en-GB')}</td>
                    <td>
                      <button
                        style={{ marginRight: '10px' }}
                        onClick={() => setViewInvoice(inv)}
                      >
                        View
                      </button>
                      <button
                        style={{ marginRight: '10px' }}
                        onClick={() => setInvoiceToDelete(inv)}
                      >Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No invoices found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
      {viewInvoice && (
        <ViewInvoiceModal
          invoice={viewInvoice}
          onClose={() => setViewInvoice(null)}
        />
      )}
      {invoiceToDelete && (
        <DeleteConfirmationModal
          onConfirm={handleDeleteInvoice}
          onCancel={() => setInvoiceToDelete(null)}
        />
      )}
    </>
  );
};

export default Invoice;