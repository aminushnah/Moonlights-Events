const express = require("express");
const router = express.Router();

const {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
} = require("../controllers/purchaseController");

router.post("/", createPurchase);
router.get("/", getAllPurchases);
router.get("/:id", getPurchaseById);

module.exports = router;
