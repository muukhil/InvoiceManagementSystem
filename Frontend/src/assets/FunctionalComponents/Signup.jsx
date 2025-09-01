import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [phonenumber, setphonenumber] = useState(0)
    const [email, setemail] = useState("")

    const handleSignup = async (event)=>{
      event.preventDefault();

      const req = await axios.post("http://localhost:5000/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phonenumber,
      })

      const message = req.data.message;
      const isSignup = req.data.isSignup;

      if(isSignup){
        alert(message);
        navigate("/login");
      }
      else{
        alert(message);
      }
    }

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        First Name:
        <input 
            type="text" 
            id="uname" 
            value={firstName} 
            onChange={(e)=>setfirstName(e.target.value)} 
            placeholder="Enter First Name"
            required 
        />
        <br /><br />

        Last Name:
        <input 
            type="text" 
            id="name" 
            value={lastName} 
            onChange={(e)=>setlastName(e.target.value)} 
            placeholder="Enter Last Name"
            required 
        />
        <br /><br />

        Email:
        <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e)=>setemail(e.target.value)} 
            placeholder="Enter Email"
            required 
        />
        <br /><br />

        Password:
        <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e)=>setpassword(e.target.value)} 
            placeholder="Enter Password"
            required 
        />
        <br /><br />

        Re-enter Password:
        <input 
            type="password" 
            id="confirm-password" 
            value={confirmPassword} 
            onChange={(e)=>setconfirmPassword(e.target.value)}
            placeholder="Re-enter Password" 
            required 
        />
        <br /><br />

        Phone Number:
        <input 
            type="tel" 
            name="phonenumber"
            id="phonenumber" 
            value={phonenumber} 
            onChange={(e)=>setphonenumber(e.target.value)}
            placeholder="Enter Phone Number" 
            required
        />
        <br /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account?<Link to='/login'>Login</Link></p>
    </div>
  )
}

export default Signup