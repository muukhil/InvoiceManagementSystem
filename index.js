const express = require('express')
const mdb = require('mongoose')
const dotenv = require('dotenv')
const bcrypt=require("bcrypt")
const Signup = require("./models/signupSchema")
const Inventory = require("./models/inventorySchema")
const Cart = require("./models/cartSchema")
const Invoice = require("./models/invoiceSchema")
const cors=require("cors")
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT||3001;

mdb.connect(process.env.MONGODB_URL).then(()=>{
    console.log('DB Connection Successful');
}).catch((err)=>{
    console.log('DB Connection error: ',err);
})

app.get("/", (req,res)=>{
    res.send("<h1> this is from Server, Mukhil's Server!</h1>")
})

app.post("/signup", async (req, res)=>{
    try{
        const{firstName, lastName, email, password, phoneNumber}=req.body
        const hashedPassword= await bcrypt.hash(password, 10);
        const newSignup =new Signup({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword,
            phoneNumber:phoneNumber
        });
        newSignup.save();
        console.log("Signup Successful!");
        res.status(201).json({message: "Signup Successful", isSignup:true})
    }catch{
        res.status(201).json({message: "Signup unsuccessful!", isSignup:false})
    }
})

app.get('/getsignupdet', async (req,res)=>{ //get user details from signup itself instead of fetching data from database everytime
    const signup = await Signup.find()
    console.log(signup)
    res.send("Signup details Fetched")
})

app.post("/login", async (req, res)=>{
    console.log("Welcome to Login Page");
    try{
        const {email, password} = req.body
        // console.log(email,password);
        // res.json(req.body);
        const existingUser = await Signup.findOne({email:email})
        console.log(existingUser);
        if(existingUser){
            const isValidPassword = await bcrypt.compare(password, existingUser.password);
            console.log(isValidPassword);
            if(isValidPassword){
                res.status(201).json({message:"Login Successful", isLoggedIn:true});
            }
            else{
                res.status(201).json({message:"Incorrect Password", isLoggedIn:false});
            }
        }
        else{
            res.status(201).json({message:"User not Found, Signup First", isLoggedIn:false});
        }

    }   catch (error) {
        console.log("Login Error");
        res.status(400).json({message:"Login Error", isLoggedIn:false});
    }
})

app.get('/getinventorydet', async (req,res)=>{ //get inventory details from database everytime
    const inventory = await Inventory.find()
    console.log(inventory)
    res.send("Inventory details Fetched")
})

app.listen(PORT, ()=>{
    console.log('the server is running on the: ',`${PORT}`)
})