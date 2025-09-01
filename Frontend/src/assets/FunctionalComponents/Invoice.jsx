import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const Invoice = () => {
  return (
    <>
    <Navbar />
    {/* <button>Add Invoice</button>
    <Link to="/addinvoice">Add Invoice</Link> */}
    <Link to="/addinvoice">
        <button style={{ marginTop: '10px' }}>Go to Add Invoice Page</button>
    </Link>
    </>
  )
}

export default Invoice