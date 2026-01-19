// models/Inventory.js
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,

    totalQuantity: {
      type: Number,
      default: 0,
    },

    availableQuantity: {
      type: Number,
      default: 0,
    },

    ratePerDay: {
      type: Number,
      default: 0,
    },

    ratePerEvent: {
      type: Number,
      default: 0,
    },

    location: {
      type: String, // Rack / Room / Warehouse
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
