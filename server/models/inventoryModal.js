const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["sound_system", "lighting", "led_screen", "tent"],
    required: true
  },
  total_quantity: { type: Number, required: true },
  booked_quantity: { type: Number, default: 0 },
  available_quantity: { type: Number }
});

inventorySchema.pre("save", function (next) {
  this.available_quantity =
    this.total_quantity - this.booked_quantity;
  next();
});

module.exports = mongoose.model("Inventory", inventorySchema);
