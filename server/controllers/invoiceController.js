const Invoice = require("../models/invoiceModal");

/**
 * @route POST /api/invoices
 */
exports.generateInvoice = async (req, res) => {
  try {
    const {
      subtotal,
      taxAmount = 0,
      totalAmount,
      advanceReceived = 0,
      paymentMethod,
      issuedAt,
    } = req.body;

    const remainingAmount = totalAmount - advanceReceived;

    let status = "unpaid";
    if (advanceReceived > 0 && remainingAmount > 0) status = "partial";
    if (remainingAmount === 0) status = "paid";

    const invoiceCount = await Invoice.countDocuments();

    const invoice = await Invoice.create({
      ...req.body,
      remainingAmount,
      status,
      issuedAt: issuedAt ? new Date(issuedAt) : Date.now(),
      invoiceNumber: `INV-${invoiceCount + 1}`,
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
/**
 * @route PUT /api/invoices/:id
 */
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Add additional advance
    if (req.body.advanceReceived) {
      invoice.advanceReceived += req.body.advanceReceived;
    }

    invoice.paymentMethod = req.body.paymentMethod || invoice.paymentMethod;

    invoice.remainingAmount =
      invoice.totalAmount - invoice.advanceReceived;

    if (invoice.remainingAmount === 0) {
      invoice.status = "paid";
      invoice.paymentType = "debit";
    } else {
      invoice.status = "partial";
      invoice.paymentType = "credit";
    }

    await invoice.save();

    res.status(200).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
/**
 * @route DELETE /api/invoices/:id
 */
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
