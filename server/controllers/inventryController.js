const Inventory = require("../models/inventoryModal");

exports.createInventory = async (req, res) => {
    try {
        const item = await Inventory.create(req.body);
        res.status(201).json({ success: true, item });
    } catch (error) {
        console.error("Create Inventory Error:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

// Get inventory (optionally by category)
exports.getInventory = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const inventory = await Inventory.find(filter);

        let summary = {
            total_items: 0,
            booked_items: 0,
            available_items: 0,
            low_stock_items: 0
        };

        inventory.forEach(item => {
            summary.total_items += item.total_quantity;
            summary.booked_items += item.booked_quantity;
            summary.available_items += item.available_quantity;

            if (item.available_quantity <= 5) {
                summary.low_stock_items += 1;
            }
        });

        res.json({ success: true, summary, inventory });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch inventory" });
    }
};

// Get single item
exports.getInventoryById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        res.json({ success: true, item });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch item" });
    }
};

// Update inventory
exports.updateInventory = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!item) return res.status(404).json({ message: "Item not found" });

        res.json({ success: true, item });
    } catch (error) {
        res.status(500).json({ message: "Failed to update inventory" });
    }
};

// Delete inventory
exports.deleteInventory = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        res.json({ success: true, message: "Inventory deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete inventory" });
    }
};
