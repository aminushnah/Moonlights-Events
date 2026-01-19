const Order = require("../models/orderModal");

// Upcoming Return Alerts
exports.getReturnAlerts = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    // Due Today
    const dueToday = await Order.find({
      reservedTo: {
        $gte: today,
        $lt: tomorrow
      }
    });

    // Due Tomorrow
    const dueTomorrow = await Order.find({
      reservedTo: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow
      }
    });

    // Overdue
    const overdue = await Order.find({
      reservedTo: { $lt: today },
      status: { $ne: "returned" }
    });

    res.json({
      success: true,
      alerts: {
        dueToday,
        dueTomorrow,
        overdue
      }
    });
  } catch (error) {
    console.error("Return Alert Error:", error);
    res.status(500).json({ message: "Failed to fetch return alerts" });
  }
};
// Mark order as returned
exports.markAsReturned = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "returned" },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
