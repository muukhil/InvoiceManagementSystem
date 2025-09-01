const mdb = require('mongoose')
const invoiceSchema = mdb.Schema({
    id:String,
    image:String,
    name:String,
    description:String,
    price:Number,
    quantity:Number,
})

const invoice_schema = mdb.model("invoice", invoiceSchema)
module.exports= invoice_schema