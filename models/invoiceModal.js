const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    mode: { type: String, enum: ["cash", "online", "credit"], required: true },
    paidAt: { type: Date, default: Date.now },
});

const invoiceSchema = new mongoose.Schema(
    {
        order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
        customer: { type: String, required: true }, 
        totalAmount: { type: Number, required: true },
        paidAmount: { type: Number, default: 0 },
        payments: [paymentSchema],
        status: { type: String, enum: ["open", "closed"], default: "open" },
        dueDate: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
