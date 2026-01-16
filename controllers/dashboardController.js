const InventoryItem = require("../models/InventoryItem");
const Order = require("../models/Order");
const Invoice = require("../models/Invoice");

exports.getDashboardSummary = async (req, res) => {
    try {

        const inventoryStats = await InventoryItem.aggregate([
            {
                $group: {
                    _id: null,
                    totalItems: { $sum: "$total_quantity" },
                    available: { $sum: "$available_quantity" },
                    lowStock: {
                        $sum: {
                            $cond: [{ $lt: ["$available_quantity", 5] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const inventory = inventoryStats[0] || {
            totalItems: 0,
            available: 0,
            lowStock: 0
        };

        inventory.booked = inventory.totalItems - inventory.available;

        /*
           BOOKINGS SUMMARY
        */
        const bookings = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        let pendingBookings = 0;
        let confirmedBookings = 0;

        bookings.forEach(b => {
            if (b._id === "pending") pendingBookings = b.count;
            if (b._id === "confirmed") confirmedBookings = b.count;
        });

        /* revenue  */
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const monthStart = new Date(todayStart.getFullYear(), todayStart.getMonth(), 1);

        const revenueAgg = await Invoice.aggregate([
            {
                $facet: {
                    today: [
                        { $match: { createdAt: { $gte: todayStart } } },
                        {
                            $group: {
                                _id: null,
                                amount: { $sum: "$paidAmount" }
                            }
                        }
                    ],
                    monthly: [
                        { $match: { createdAt: { $gte: monthStart } } },
                        {
                            $group: {
                                _id: null,
                                amount: { $sum: "$paidAmount" }
                            }
                        }
                    ],
                    pendingDues: [
                        {
                            $group: {
                                _id: null,
                                amount: {
                                    $sum: {
                                        $subtract: ["$totalAmount", "$paidAmount"]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]);

        const revenue = {
            today: revenueAgg[0].today[0]?.amount || 0,
            monthly: revenueAgg[0].monthly[0]?.amount || 0,
            pendingDues: revenueAgg[0].pendingDues[0]?.amount || 0
        };

        /* response */
        res.status(200).json({
            success: true,
            inventory: {
                totalItems: inventory.totalItems,
                available: inventory.available,
                booked: inventory.booked,
                lowStock: inventory.lowStock
            },
            revenue,
            bookings: {
                pending: pendingBookings,
                confirmed: confirmedBookings
            }
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to load dashboard summary"
        });
    }
};
