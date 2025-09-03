const mdb = require('mongoose')
const cartSchema = new mdb.Schema({
  userId: { type: mdb.Schema.Types.ObjectId, ref: 'Signup' },
  items: [
    {
      productId: { type: mdb.Schema.Types.ObjectId, ref: 'Inventory' },
      quantity: Number
    }
  ]
}, { timestamps: true });

module.exports = mdb.model("Cart", cartSchema)