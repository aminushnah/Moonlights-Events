const express = require("express");
const router = express.Router();
const { generateInvoice } = require("../controllers/invoiceController");
router.post("/", generateInvoice);
// router.get("/", invoiceController.getInvoices);         
// router.get("/:id", invoiceController.getInvoiceById);    
// router.put("/:id", invoiceController.updateInvoice);     
// router.delete("/:id", invoiceController.deleteInvoice);  

module.exports = router;


