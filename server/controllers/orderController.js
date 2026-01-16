const Order = require("../models/orderModal");
const Invoice = require("../models/invoiceModal");
const Inventory = require("../models/inventoryModal");



// Create Order + Auto-generate Invoice
exports.createOrder = async (req, res) => {
    try {
        const { items, category } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order items required" });
        }

        // Check inventory availability
        for (const item of items) {
            const inventory = await Inventory.findOne({
                name: new RegExp(`^${item.name}$`, "i"),
                category
            });

            if (!inventory) {
                return res.status(400).json({
                    message: `Inventory item not found: ${item.name}`
                });
            }

            if (inventory.available_quantity < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${item.name}`
                });
            }
        }

        // Create order
        const order = await Order.create(req.body);

        // Update inventory
        for (const item of items) {
            await Inventory.findOneAndUpdate(
                { name: item.name, category },
                {
                    $inc: {
                        booked_quantity: item.quantity,
                        available_quantity: -item.quantity
                    }
                }
            );
        }

        res.status(201).json({ success: true, order });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};





exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.error("Get Order Error:", error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.error("Update Order Error:", error);
        res.status(500).json({ message: "Failed to update order" });
    }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Delete Order Error:", error);
        res.status(500).json({ message: "Failed to delete order" });
    }
};
