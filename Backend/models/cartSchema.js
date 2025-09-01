const mdb = require('mongoose')
const cartSchema = mdb.Schema({
    id:String,
    image:String,
    name:String,
    description:String,
    price:Number,
    quantity:Number,
})

const cart_schema = mdb.model("cart", cartSchema)
module.exports= cart_schema