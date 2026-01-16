// const express = require("express");
// const router = express.Router();
// const invoiceController = require("../controllers/invoiceController");

// router.post("/", invoiceController.createInvoice);        
// router.get("/", invoiceController.getInvoices);         
// router.get("/:id", invoiceController.getInvoiceById);    
// router.put("/:id", invoiceController.updateInvoice);     
// router.delete("/:id", invoiceController.deleteInvoice);  

// module.exports = router;


const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoiceModal");

// Get all invoices
router.get("/", async (req, res) => {
    try {
        const invoices = await Invoice.find().populate("order").sort({ createdAt: -1 });
        res.json({ success: true, invoices });
    } catch (error) {
        console.error("Get Invoices Error:", error);
        res.status(500).json({ message: "Failed to fetch invoices" });
    }
});

// Get invoice by order ID
router.get("/order/:orderId", async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ order: req.params.orderId }).populate("order");
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found for this order" });
        }
        res.json({ success: true, invoice });
    } catch (error) {
        console.error("Get Invoice by Order Error:", error);
        res.status(500).json({ message: "Failed to fetch invoice" });
    }
});

// Get invoice by invoice ID
router.get("/:id", async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate("order");
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({ success: true, invoice });
    } catch (error) {
        console.error("Get Invoice by ID Error:", error);
        res.status(500).json({ message: "Failed to fetch invoice" });
    }
});

module.exports = router;

