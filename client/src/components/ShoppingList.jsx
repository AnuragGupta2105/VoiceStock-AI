import { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "../styles/shoppingList.css";

import {
  updateShoppingItem,
  deleteShoppingItem,
} from "../api/shoppingApi";

const icons = {
  Milk: "🥛",
  Bread: "🍞",
  Eggs: "🥚",
  Rice: "🍚",
  Apples: "🍎",
  Banana: "🍌",
  Tomato: "🍅",
  Potato: "🥔",
  Onion: "🧅",
  Cheese: "🧀",
  Butter: "🧈",
  Yogurt: "🥣",
  Coffee: "☕",
  Tea: "🫖",
  Juice: "🧃",
  Shampoo: "🧴",
  Soap: "🧼",
  Chocolate: "🍫",
  Cookies: "🍪",
};

function ShoppingList({
  shoppingList,
  loadShoppingItems,
  setHistory,
}) {

  // ==========================
  // Dropdown State
  // ==========================

  const [openMenu, setOpenMenu] =
    useState(null);

  const dropdownRef = useRef(null);

  // ==========================
  // Close menu on outside click
  // ==========================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {

        setOpenMenu(null);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // ==========================
  // History
  // ==========================

  const addHistory = (text) => {

    if (!setHistory) return;

    setHistory((prev) => [

      {

        text,

        time: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

      },

      ...prev.slice(0, 9),

    ]);

  };

  // ==========================
  // Quantity
  // ==========================

  const changeQuantity = async (
    id,
    delta
  ) => {

    try {

      const product = shoppingList.find(
        (item) => item._id === id
      );

      if (!product) return;

      const quantity = Math.max(
        1,
        product.quantity + delta
      );

      await updateShoppingItem(id, {
        quantity,
      });

      await loadShoppingItems();

      addHistory(

        `${delta > 0 ? "➕ Increased" : "➖ Decreased"} ${product.name}`

      );

    }

    catch (err) {

      console.error(err);

    }

  };

  // ==========================
  // Status
  // ==========================

  const changeStatus = async (
    id,
    status
  ) => {

    try {

      const product = shoppingList.find(
        (item) => item._id === id
      );

      if (!product) return;

      await updateShoppingItem(id, {
        status,
      });

      await loadShoppingItems();

      addHistory(

        `${product.name} marked as ${status}`

      );

      setOpenMenu(null);

    }

    catch (err) {

      console.error(err);

    }

  };

  // ==========================
  // Delete
  // ==========================

  const removeItem = async (id) => {

    try {

      const product = shoppingList.find(
        (item) => item._id === id
      );

      if (!product) return;

      await deleteShoppingItem(id);

      await loadShoppingItems();

      addHistory(

        `🗑 Removed ${product.name}`

      );

    }

    catch (err) {

      console.error(err);

    }

  };

  return (

    <section
      id="shopping-list"
      className="shopping-section"
    >

      <div className="section-header">

        <h2>🛒 Shopping List</h2>

        <p>

          {shoppingList.length} Items • Ready for shopping

        </p>

      </div>

      <div className="shopping-list">

        {shoppingList.map((item) => (

          <div
            className="shopping-card"
            key={item._id}
          >

            {/* Top */}

            <div className="card-top">

              <div className="product-left">

                <div className="product-icon">

                  {icons[item.name] || "🛒"}

                </div>

                <div>

                  <h3>{item.name}</h3>

                  <p>

                    {item.brand || "Generic"} • {item.category}

                  </p>

                </div>

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  removeItem(item._id)
                }
              >

                <FaTrash />

              </button>

            </div>

            {/* Price */}

            <div className="price-section">

              <div>

                <span>Price</span>

                <h4>

                  ₹{item.price || 0}

                </h4>

              </div>

              <div>

                <span>Total</span>

                <h4>

                  ₹{(item.price || 0) * item.quantity}

                </h4>

              </div>

            </div>

            {/* Bottom */}

            <div className="card-bottom">

              <div className="quantity-controls">

                <button
                  onClick={() =>
                    changeQuantity(
                      item._id,
                      -1
                    )
                  }
                >

                  −

                </button>

                <span>

                  {item.quantity}

                </span>

                <button
                  onClick={() =>
                    changeQuantity(
                      item._id,
                      1
                    )
                  }
                >

                  +

                </button>

              </div>
                            {/* Status Dropdown */}

              <div
                className="status-dropdown"
                ref={
                  openMenu === item._id
                    ? dropdownRef
                    : null
                }
              >

                <button
                  className={`status ${item.status.toLowerCase()}`}
                  onClick={() =>
                    setOpenMenu(
                      openMenu === item._id
                        ? null
                        : item._id
                    )
                  }
                >

                  {item.status} ▼

                </button>

                {openMenu === item._id && (

                  <div className="status-menu">

                    <button
                      onClick={() =>
                        changeStatus(
                          item._id,
                          "Added"
                        )
                      }
                    >

                      🟢 Added

                    </button>

                    <button
                      onClick={() =>
                        changeStatus(
                          item._id,
                          "Purchased"
                        )
                      }
                    >

                      🛒 Purchased

                    </button>

                    <button
                      onClick={() =>
                        changeStatus(
                          item._id,
                          "Pending"
                        )
                      }
                    >

                      ⏳ Pending

                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        ))}

        {shoppingList.length === 0 && (

          <div className="empty-shopping">

            <h3>🛍 Your shopping list is empty</h3>

            <p>

              Use the Voice Assistant or Search to
              add products.

            </p>

          </div>

        )}

      </div>

    </section>

  );

}

export default ShoppingList;