const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

  getItems,

  addItem,

  updateItem,

  deleteItem,

} = require("../controllers/shoppingController");

router.get("/", protect, getItems);

router.post("/", protect, addItem);

router.put("/:id", protect, updateItem);

router.delete("/:id", protect, deleteItem);

module.exports = router;