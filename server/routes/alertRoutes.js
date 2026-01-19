const express = require("express");
const router = express.Router();
const { getReturnAlerts } = require("../controllers/alertController");

router.get("/returns", getReturnAlerts);

module.exports = router;
