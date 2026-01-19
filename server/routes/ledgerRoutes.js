const express = require("express");
const { createLedgerEntry } = require("../controllers/ledgerController");
const router = express.Router();

router.post("/", createLedgerEntry);

module.exports = router;
