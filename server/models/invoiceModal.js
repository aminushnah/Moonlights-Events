const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    invoiceNumber: {
      type: String,
      unique: true,
    },

    subtotal: Number,
    taxAmount: Number,
    totalAmount: Number,

    status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
