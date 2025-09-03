const mdb = require('mongoose')

const invoiceSchema = new mdb.Schema({
  userId: { type: mdb.Schema.Types.ObjectId, ref: 'Signup' },
  client: {
    name: String,
    email: String,
    address: String,
    phoneNumber: String
  },
  billingAddress: String,
  shippingAddress: String,
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  invoiceNumber: { type: String, unique: true },
  totalAmount: Number,
  status: { type: String, enum: ['paid', 'unpaid', 'pending'], default: 'unpaid' },
  dueDate: Date,
  issueDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mdb.model("Invoice", invoiceSchema)