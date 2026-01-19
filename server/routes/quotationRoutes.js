const express = require("express");
const router = express.Router();

const {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotation,
  deleteQuotation,
  convertQuotationToOrder,
} = require("../controllers/quotationController");

router.post("/", createQuotation);
router.get("/", getAllQuotations);
router.get("/:id", getQuotationById);
router.put("/:id", updateQuotation);
router.delete("/:id", deleteQuotation);
router.post("/:id/convert-to-order", convertQuotationToOrder);

module.exports = router;
