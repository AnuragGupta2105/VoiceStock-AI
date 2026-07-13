import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/navbar.css";
import products from "../data/products";

import {
  FaShoppingCart,
  FaMicrophone,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

function Navbar({
  darkMode,
  setDarkMode,
  shoppingList = [],
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const totalItems = shoppingList.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const suggestions =
    search.trim() === ""
      ? []
      : products
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const goToShoppingList = () => {
    document
      .getElementById("shopping-list")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const goToVoice = () => {
    document
      .getElementById("voice-shopping")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const goToHero = () => {
    document
      .getElementById("hero")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <nav className="navbar">
      {/* Logo */}

      <div
        className="logo"
        onClick={goToHero}
      >
        <div className="logo-icon">
          <FaShoppingCart />
        </div>

        <div className="logo-text">
          <h2>VoiceStock AI</h2>
          <p>Smart AI Shopping Assistant</p>
        </div>
      </div>

      {/* Right */}

      <div className="navbar-right">

        {/* Search */}

       <div className="search-container">

  <div className="search-box">

    <FaSearch />

    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
    />

  </div>

  {search && (

    <div className="search-suggestions">

      {suggestions.length > 0 ? (

        suggestions.map(product => (

          <button
            key={product.name}
            className="search-item"
            onClick={() => {

              setSearch(product.name);

              document
                .getElementById("shopping-list")
                ?.scrollIntoView({
                  behavior: "smooth",
                });

            }}
          >

            🔍 {product.name}

          </button>

        ))

      ) : (

        <div className="no-result">

          No products found

        </div>

      )}

    </div>

  )}

</div>

        {/* Cart */}

        <button
          className="cart-info"
          onClick={goToShoppingList}
        >

          🛒

          <span>{totalItems} Items</span>

        </button>

        {/* Theme */}

        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Voice */}

        <button
          className="voice-status"
          onClick={goToVoice}
        >

          <FaMicrophone />

          Voice Ready

        </button>

        {/* Profile */}

        <div
          className="profile-wrapper"
          ref={menuRef}
        >

          <button
            className="profile-btn"
            onClick={() =>
              setShowMenu(!showMenu)
            }
          >

            <div className="profile-avatar">

              {(user?.name || "U")
                .charAt(0)
                .toUpperCase()}

            </div>

            <span className="profile-name">

              {user?.name
                ? user.name.split(" ")[0]
                : "User"}

            </span>

            <FaChevronDown />

          </button>

          {showMenu && (

            <div className="profile-menu">

              <div className="profile-header">

                <div className="profile-avatar large">

                  {(user?.name || "U")
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <h4>{user?.name}</h4>

                <p>{user?.email}</p>

              </div>
<button
  type="button"
  onClick={() => {
    navigate("/profile");
    setShowMenu(false);
  }}
>
  <FaUser />
  <span>My Profile</span>
</button>

<button
  type="button"
  onClick={logout}
>
  <FaSignOutAlt />
  <span>Logout</span>
</button>

            </div>

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;