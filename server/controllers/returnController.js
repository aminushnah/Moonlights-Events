const Return = require("../models/return");
const Inventory = require("../models/inventoryModal");
const Order = require("../models/orderModal");

/**
 * @route POST /api/returns
 */
exports.processReturn = async (req, res) => {
  try {
    const { orderId, items } = req.body;

    // 1. Restore inventory
    for (const item of items) {
      await Inventory.findByIdAndUpdate(item.inventoryItemId, {
        $inc: { availableQuantity: item.quantity },
      });
    }

    // 2. Mark order completed
    await Order.findByIdAndUpdate(orderId, { status: "completed" });

    // 3. Save return record
    const returnDoc = await Return.create({ orderId, items });

    res.json({ success: true, data: returnDoc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
