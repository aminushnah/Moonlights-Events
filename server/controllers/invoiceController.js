const Invoice = require("../models/invoiceModal");

/**
 * @route POST /api/invoices
 */
exports.generateInvoice = async (req, res) => {
  try {
    const { issuedAt } = req.body;

    // Validate issuedAt if provided
    if (issuedAt && isNaN(new Date(issuedAt).getTime())) {
      return res.status(400).json({ message: "Invalid issuedAt date" });
    }

    const invoiceCount = await Invoice.countDocuments();

    const invoice = await Invoice.create({
      ...req.body,
      issuedAt: issuedAt ? new Date(issuedAt) : Date.now(),
      invoiceNumber: `INV-${invoiceCount + 1}`,
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
