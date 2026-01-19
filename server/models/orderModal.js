const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    inventoryItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rate: Number,
    rentalType: {
      type: String,
      enum: ["per-day", "per-event"],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    eventName: String,
    eventLocation: String,

    rentalFrom: Date,
    rentalTo: Date,

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "confirmed",
    },

    items: [orderItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
