const express = require("express");
const router = express.Router();
const salleryController = require("../controllers/salleryController");

// CRUD routes
router.post("/", salleryController.createEmployee); // Create
router.get("/", salleryController.getEmployees); // Get all
router.get("/:id", salleryController.getEmployeeById); // Get by ID
router.put("/:id", salleryController.updateEmployee); // Update
router.delete("/:id", salleryController.deleteEmployee); // Delete

module.exports = router;
