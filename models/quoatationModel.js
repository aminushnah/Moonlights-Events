const quotationSchema = new mongoose.Schema({
  customerName: String,
  eventName: String,
  location: String,
  eventDate: Date,
  validTill: Date,
  items: [{
    inventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem" },
    quantity: Number,
    rate: Number
  }],
  status: { type: String, enum: ["pending", "approved"], default: "pending" }
});

module.exports = mongoose.model("Quotation", quotationSchema);
