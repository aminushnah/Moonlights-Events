const express = require("express");
const { processReturn } = require("../controllers/returnController");
const router = express.Router();

router.post("/", processReturn);

module.exports = router;
