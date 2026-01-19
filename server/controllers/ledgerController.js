const Ledger = require("../models/ledger");

/**
 * @route POST /api/ledger
 */
exports.createLedgerEntry = async (req, res) => {
    try {
        const last = await Ledger.findOne().sort({ createdAt: -1 });
        const previousBalance = last ? last.balance : 0;

        const balance =
            previousBalance + (req.body.credit || 0) - (req.body.debit || 0);

        const entry = await Ledger.create({
            ...req.body,
            balance,
        });

        res.json({ success: true, data: entry });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
