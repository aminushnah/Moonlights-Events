const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true }, 
  eventName: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventDate: { type: Date, required: true },
  reservedFrom: { type: Date, required: true },
  reservedTo: { type: Date, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  status: { type: String, default: "confirmed" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
