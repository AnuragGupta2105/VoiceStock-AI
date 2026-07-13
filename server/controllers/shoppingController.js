const ShoppingItem = require("../models/ShoppingItem");

// ================= GET ITEMS =================

const getItems = async (req, res) => {
  try {
    const items = await ShoppingItem.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= ADD ITEM =================

const addItem = async (req, res) => {
  try {
    const { name, category, brand, price, quantity } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Item name is required",
      });
    }

    const item = await ShoppingItem.create({
      user: req.user.id,
      name,
      category: category || "",
      brand: brand || "",
      price: price || 0,
      quantity: quantity || 1,
      status: "Added",
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= UPDATE ITEM =================

const updateItem = async (req, res) => {
  try {
    const item = await ShoppingItem.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(item);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= DELETE ITEM =================

const deleteItem = async (req, res) => {
  try {
    const item = await ShoppingItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json({
      message: "Item Deleted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};