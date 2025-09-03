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

const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

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
        // const hashedPassword= await bcrypt.hash(password, 10);
        const newSignup =new Signup({
            firstName:firstName,
            lastName:lastName,
            email:email,
            // password:hashedPassword,
            password:password,
            phoneNumber:phoneNumber
        });
        await newSignup.save();
        console.log("Signup Successful!");
        res.status(201).json({message: "Signup Successful", isSignup:true})
    }catch (error){
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(201).json({
                message: "Email is already registered.",
                isSignup: false,
            });
        }

        res.status(201).json({message: "Signup unsuccessful! " + error.message, isSignup:false})
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
            // const isValidPassword = await bcrypt.compare(password, existingUser.password);
            const isValidPassword = password==existingUser.password;
            console.log(isValidPassword);
            if(isValidPassword){
                res.status(201).json({message:"Login Successful", isLoggedIn:true});
            }
            else{
                return res.status(401).json({ message: "Incorrect email or password", isLoggedIn: false });
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
    try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory); // ✅ Send actual data
  } catch (err) {
    console.error('Error fetching inventory:', err);
    res.status(500).json({ message: 'Error fetching inventory' });
  }
});

app.post("/invoice", async (req, res)=>{
    const {prod_id} = req.body;
    const product = await Inventory.findOne({id:prod_id});
    console.log(product);
})

app.post("/invoice", async (req, res) => {
    try {
        const { id } = req.body; // Destructure to get the product ID from the body
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Inventory.findOne({ id }); // Query the Inventory with the provided id

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log(product);
        res.status(200).json({ product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


app.get('/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Failed to fetch invoices' });
    }
});

// DELETE invoice by invoiceNumber
app.delete('/invoices/by-number/:invoiceNumber', async (req, res) => {
    try {
        const { invoiceNumber } = req.params;
        
        const deleted = await Invoice.findOneAndDelete({ invoiceNumber });
        
        if (!deleted) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        
        res.status(200).json({ message: 'Invoice deleted successfully', deleted });
    } catch (error) {
        console.error('Error deleting invoice:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

app.post("/addinvoice", async (req, res)=>{
    try{
        // const userId = req.session.userId; // or from JWT if using token
        // if (!userId) return res.status(401).json({ message: "Unauthorized" });

        // const user = await Signup.findById(userId);
        const userId = "687693559e0abd64e2f37fbd";

        const {
            invoiceNumber,
            billingAddress,
            shippingAddress,
            items,
            dueDate,
            issueDate,
            totalAmount,
            client // optional if not using session-based user
        } = req.body;

        const invoice = new Invoice({
            userId,
            client: {
                name: client?.name || user.firstName + " " + user.lastName,
                email: client?.email || user.email,
                phoneNumber: client?.phoneNumber || user.phoneNumber,
                address: client?.address || user.address || "Not Provided"
            },
            invoiceNumber,
            billingAddress,
            shippingAddress,
            items,
            issueDate,
            dueDate,
            totalAmount
        });

        await invoice.save();
        res.status(201).json({ message: "Invoice Created", invoice });
    }
    catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            stack: error.stack
        });
    }
})

app.listen(PORT, ()=>{
    console.log('the server is running on the: ',`${PORT}`)
})