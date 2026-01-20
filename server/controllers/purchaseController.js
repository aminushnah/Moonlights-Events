const Purchase = require("../models/purchaseModel");
const Inventory = require("../models/inventoryModal");
const { mongoose } = require("mongoose");

/**
 * @desc   Create purchase & update inventory
 * @route  POST /api/purchases
 */
exports.createPurchase = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Purchase must contain at least one item",
      });
    }

    // 1. Create Purchase
    const [purchase] = await Purchase.create([req.body], { session });

    // 2. Update Inventory
    for (const item of items) {
      let inventoryItem = await Inventory.findOne(
        {
          itemName: item.itemName,
          category: item.category,
        },
        null,
        { session }
      );

      if (inventoryItem) {
        inventoryItem.totalQuantity += item.quantity;
        inventoryItem.availableQuantity += item.quantity;
        inventoryItem.costPrice = item.costPrice;

        await inventoryItem.save({ session });
      } else {
        await Inventory.create(
          [
            {
              itemName: item.itemName,
              category: item.category,
              totalQuantity: item.quantity,
              availableQuantity: item.quantity,
              costPrice: item.costPrice,
            },
          ],
          { session }
        );
      }
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Purchase Transaction Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc   Get all purchases
 * @route  GET /api/purchases
 */
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc   Get purchase by ID
 * @route  GET /api/purchases/:id
 */
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate(
      "items.inventoryItemId"
    );

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
