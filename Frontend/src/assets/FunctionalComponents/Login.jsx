import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Signup from './Signup';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            navigate("/");
        }
        else{
            alert(req.data.message);
        }
    }
  return (
    <div>
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
            <button type="submit">Login</button>
            <br /><br />
            New here? <Link to="/signup">Signup</Link>
        </form>
    </div>
  )
}

export default Login