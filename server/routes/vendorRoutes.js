const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

// CRUD routes
router.post("/", vendorController.createVendor);      // Create
router.get("/", vendorController.getVendors);         // Read all
router.get("/:id", vendorController.getVendorById);   // Read one
router.put("/:id", vendorController.updateVendor);    // Update
router.delete("/:id", vendorController.deleteVendor); // Delete

module.exports = router;
