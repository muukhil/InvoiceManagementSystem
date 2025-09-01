import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Navbar.css'

const Navbar = () => {
    const [dropdown, showdropdown] = useState(false);
  return (
    <header>
        <nav>
            <li><Link to="/" className="">Home</Link></li>
            <li><Link to="/login" className="">Login</Link></li>
            {/* <li><Link to="/signup" className="">Signup</Link></li> */}
            <li><Link to="/invoice" className="">Invoice</Link></li>
        </nav>
    </header>
  )
}

export default Navbar