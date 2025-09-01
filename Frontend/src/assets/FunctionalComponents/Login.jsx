import React, {useState} from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from "axios";
import Navbar from './Navbar';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const [password, setPassword] = useState(location.state?.password || "");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleLogin = async  (event)=>{
        event.preventDefault();
        var req = await axios.post("http://localhost:5000/login", {  //this is the backend connection link
            email, 
            password,
        });

        var isLogginSuccessful = req.data.isLoggedIn;

        if(isLogginSuccessful){
            alert(req.data.message);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true); // from AuthContext
            navigate("/");
        }
        else{
            setErrorMessage(req.data.message || "Login failed");
        }
    }
  return (
    <div>
        <Navbar />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            Email:
            <input 
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
            />
            <br /><br />
            Password:
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
            />
            <br /><br />
            {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
            <br /><br />
            <button type="submit">Login</button>
            <br /><br />
            New here? <Link to="/signup">Signup</Link>
        </form>
    </div>
  )
}

export default Login