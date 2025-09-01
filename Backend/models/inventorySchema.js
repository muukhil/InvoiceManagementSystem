const mdb = require('mongoose')
const inventorySchema = mdb.Schema({
    id:Number,
    image:String,
    name:String,
    description:String,
    price:Number,
    quantity:Number,
})

const inventory_schema = mdb.model("inventory", inventorySchema)
module.exports= inventory_schema