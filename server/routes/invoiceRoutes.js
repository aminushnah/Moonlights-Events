const express = require("express");
const router = express.Router();
const { generateInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoiceController");
router.post("/", generateInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice); 

module.exports = router;


