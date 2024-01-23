const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;


const orderSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // product này chứa nhiều
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // assuming 'Product' is the model name for products
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  }
);
var Orders = mongoose.model("Order", orderSchema);
module.exports = Orders;