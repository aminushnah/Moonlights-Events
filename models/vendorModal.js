const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: String,
  phone: String,
  type: String,
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);
