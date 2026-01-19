const Order = require("../models/orderModal");
const Inventory = require("../models/inventoryModal");



/**
 * @desc Create order with availability check
 * @route POST /api/orders
 */
exports.createOrder = async (req, res) => {
  try {
    const { customerName, eventName, eventLocation, rentalFrom, rentalTo, items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items must be a non-empty array" });
    }

    // 1. Availability check & assign rates
    for (const item of items) {
      const inventory = await Inventory.findById(item.inventoryItemId);
      if (!inventory) {
        return res.status(404).json({ message: "Inventory item not found" });
      }
      if (inventory.availableQuantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${inventory.itemName}`,
        });
      }
      item.rate = item.rentalType === "per-day" ? inventory.ratePerDay : inventory.ratePerEvent;
    }

    // 2. Deduct inventory
    for (const item of items) {
      await Inventory.findByIdAndUpdate(item.inventoryItemId, {
        $inc: { availableQuantity: -item.quantity },
      });
    }

    // 3. Create order
    const order = await Order.create({
      customerName,
      eventName,
      eventLocation,
      rentalFrom,
      rentalTo,
      items,
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Update an order
 * @route PUT /api/orders/:id
 */
exports.updateOrder = async (req, res) => {
  try {
    const { items, customerName, eventName, eventLocation, rentalFrom, rentalTo } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // 1. Restore inventory from old items
    for (const item of order.items) {
      await Inventory.findByIdAndUpdate(item.inventoryItemId, {
        $inc: { availableQuantity: item.quantity },
      });
    }

    // 2. Validate and deduct inventory for new items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items must be a non-empty array" });
    }

    for (const item of items) {
      const inventory = await Inventory.findById(item.inventoryItemId);
      if (!inventory) {
        return res.status(404).json({ message: "Inventory item not found" });
      }
      if (inventory.availableQuantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${inventory.itemName}`,
        });
      }
      item.rate = item.rentalType === "per-day" ? inventory.ratePerDay : inventory.ratePerEvent;
    }

    for (const item of items) {
      await Inventory.findByIdAndUpdate(item.inventoryItemId, {
        $inc: { availableQuantity: -item.quantity },
      });
    }

    // 3. Update order
    order.customerName = customerName || order.customerName;
    order.eventName = eventName || order.eventName;
    order.eventLocation = eventLocation || order.eventLocation;
    order.rentalFrom = rentalFrom || order.rentalFrom;
    order.rentalTo = rentalTo || order.rentalTo;
    order.items = items;

    const updatedOrder = await order.save();

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Delete an order
 * @route DELETE /api/orders/:id
 */
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Restore inventory
    for (const item of order.items) {
      await Inventory.findByIdAndUpdate(item.inventoryItemId, {
        $inc: { availableQuantity: item.quantity },
      });
    }

    await order.deleteOne();

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


