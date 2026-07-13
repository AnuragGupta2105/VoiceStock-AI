const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    brand: {
      type: String,
      default: "Generic",
    },

    price: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Added", "Purchased", "Pending"],
      default: "Added",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model(
  "ShoppingItem",
  shoppingItemSchema
);