const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
  itemName: String,
  category: String,
  description: String,
  quantity: Number,
  serialNumber: String,
  ratePerDay: Number,
  ratePerEvent: Number,
  location: {
    rack: String,
    room: String,
    warehouse: String
  }
});

module.exports = mongoose.model("InventoryItem", inventorySchema);
