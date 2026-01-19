const express = require("express");
const router = express.Router();
console.log("🔥 orderRoutes loaded");
const { createOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
