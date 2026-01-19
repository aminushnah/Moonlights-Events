
const mongoose = require("mongoose");

const purchaseItemSchema = new mongoose.Schema(
  {
    itemName: String,
    category: String,
    quantity: Number,
    purchasePrice: Number,
    totalPrice: Number,

    inventoryItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },
  },
  { _id: false }
);

const purchaseSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },

    vendorPhone: String,

    purchaseDate: {
      type: Date,
      default: Date.now,
    },

    items: [purchaseItemSchema],

    subtotal: Number,
    taxAmount: Number,
    totalAmount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
