const Invoice = require("../models/invoiceModel");
const Order = require("../models/orderModal");

// Create Invoice
exports.createInvoice = async (req, res) => {
    try {
        const { orderId, customer, totalAmount, dueDate } = req.body;

        // Optional: validate order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const invoice = await Invoice.create({
            order: orderId,
            customer,
            totalAmount,
            dueDate,
        });

        res.status(201).json({ success: true, invoice });
    } catch (error) {
        console.error("Create Invoice Error:", error);
        res.status(500).json({ message: "Failed to create invoice" });
    }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 }).populate("order");
        res.json({ success: true, invoices });
    } catch (error) {
        console.error("Get Invoices Error:", error);
        res.status(500).json({ message: "Failed to fetch invoices" });
    }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate("order");
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({ success: true, invoice });
    } catch (error) {
        console.error("Get Invoice Error:", error);
        res.status(500).json({ message: "Failed to fetch invoice" });
    }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({ success: true, invoice });
    } catch (error) {
        console.error("Update Invoice Error:", error);
        res.status(500).json({ message: "Failed to update invoice" });
    }
};

// Delete invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({ success: true, message: "Invoice deleted successfully" });
    } catch (error) {
        console.error("Delete Invoice Error:", error);
        res.status(500).json({ message: "Failed to delete invoice" });
    }
};
