const ShoppingItem = require("../models/ShoppingItem");

// GET ALL ITEMS
const getItems = async (req, res) => {
  try {
    const items = await ShoppingItem.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(items);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// ADD ITEM
const addItem = async (req, res) => {

  try {

    const item = await ShoppingItem.create({

      user: req.user.id,

      name: req.body.name,

      category: req.body.category,

      brand: req.body.brand,

      price: req.body.price,

      quantity: req.body.quantity,

      status: "Added",

    });

    res.status(201).json(item);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// UPDATE ITEM
const updateItem = async (req, res) => {

  try {

    const item = await ShoppingItem.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
  returnDocument: "after"
}

    );

    res.json(item);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// DELETE ITEM
const deleteItem = async (req, res) => {

  try {

    await ShoppingItem.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Item Deleted",
    });

  } catch (err) {

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