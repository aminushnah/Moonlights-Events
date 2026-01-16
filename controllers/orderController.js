const Order = require("../models/orderModal");
const Invoice = require("../models/invoiceModal");

// Create Order + Auto-generate Invoice
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        // Automatically create an invoice for this order
        const invoice = await Invoice.create({
            order: order._id,
            customer: order.customer,
            totalAmount: req.body.totalAmount || 0, // optional: pass totalAmount in request body
            dueDate: req.body.dueDate || null,      // optional: pass dueDate in request body
        });

        res.status(201).json({
            success: true,
            order,
            invoice
        });

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
