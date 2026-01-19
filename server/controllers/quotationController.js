const Quotation = require("../models/quoatationModel");
const Order = require("../models/orderModal");
const Inventory = require("../models/inventoryModal");


exports.convertQuotationToOrder = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    if (quotation.status !== "approved") {
      return res.status(400).json({
        message: "Only approved quotations can be converted to orders",
      });
    }

    if (quotation.convertedToOrder) {
      return res.status(400).json({
        message: "Quotation already converted to order",
      });
    }

    // 1️⃣ Inventory availability check
    for (const item of quotation.items) {
      const inventory = await Inventory.findById(item.inventoryItem);
      if (!inventory) {
        return res.status(404).json({ message: "Inventory item not found" });
      }
      if (inventory.availableQuantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${inventory.itemName}`,
        });
      }
    }

    // 2️⃣ Deduct inventory
    for (const item of quotation.items) {
      await Inventory.findByIdAndUpdate(item.inventoryItem, {
        $inc: { availableQuantity: -item.quantity },
      });
    }

    // 3️⃣ Create order from quotation
    const order = await Order.create({
      customerName: quotation.customerName,
      eventName: quotation.eventName,
      eventLocation: quotation.location,
      rentalFrom: quotation.eventDate,
      items: quotation.items.map((item) => ({
        inventoryItemId: item.inventoryItem,
        quantity: item.quantity,
        rate: item.rate,
        rentalType: "per-event",
      })),
    });

    // 4️⃣ Mark quotation as converted
    quotation.convertedToOrder = true;
    await quotation.save();

    res.status(201).json({
      success: true,
      message: "Quotation converted to order successfully",
      data: order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);
    res.status(201).json({ success: true, data: quotation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get all quotations
 * @route GET /api/quotations
 */
exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .populate("items.inventoryItem")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quotations.length,
      data: quotations,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get single quotation
 * @route GET /api/quotations/:id
 */
exports.getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id).populate(
      "items.inventoryItem"
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.status(200).json({ success: true, data: quotation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Update quotation
 * @route PUT /api/quotations/:id
 */
exports.updateQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.status(200).json({ success: true, data: quotation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Delete quotation
 * @route DELETE /api/quotations/:id
 */
exports.deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.status(200).json({
      success: true,
      message: "Quotation deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
