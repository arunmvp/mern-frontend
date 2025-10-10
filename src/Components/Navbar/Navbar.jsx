import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "../../assets/logo/logo.png";
import CartDrawer from "../CartDrawer/CartDrawer";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { ProductContext } from "../Contexts/PopupContext";
import { AuthContext } from "../Contexts/AuthContext";
import AuthPopup from "../RegisterLogin/AuthUser";

export default function Navbar() {
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  const { OpenPopup } = useContext(ProductContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  // Filter top 5 search results
  const filteredProducts = (products || [])
    .filter((p) => p.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  // Logout handling
  const handleLogout = () => setLogoutConfirm(true);

  const confirmLogout = () => {
    logout();
    setLogoutConfirm(false);
    setUserOpen(false);
  };

  return (
    <>
      {/* ================= AUTH POPUP ================= */}
      <AuthPopup
        isOpen={authPopupOpen}
        onClose={() => setAuthPopupOpen(false)}
        defaultMode={authMode}
      />

      {/* ================= LOGOUT CONFIRMATION ================= */}
      {logoutConfirm && (
        <div className="auth-backdrop">
          <div className="auth-popup">
            <h3>Are you sure you want to logout?</h3>
            <div className="logout-actions">
              <button className="submit-btn" onClick={confirmLogout}>
                Yes
              </button>
              <button
                className="submit-btn"
                onClick={() => setLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        {/* Logo */}
        <div className="nav-logo-container">
          <img src={Logo} alt="Logo" className="logo" />
          <h1 className="nav-logo">E-Comm</h1>
        </div>

        {/* ================= Desktop Search ================= */}
        <div className="nav-search desktop-only">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <label>Search Products...</label>

          <AnimatePresence>
            {searchTerm && (
              <motion.div
                className="search-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      className="search-item"
                      onClick={() => {
                        OpenPopup(item);
                        setSearchTerm("");
                      }}
                    >
                      <img src={item.image} alt={item.title} />
                      <div className="info">
                        <p className="title">{item.title}</p>
                        <p className="price">${item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results">No products found</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= Links ================= */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>HOME</li>
          <li>BAG</li>
          <li>SNEAKERS</li>
          <li>BELT</li>
          <li>CONTACT</li>
        </ul>

        {/* ================= Actions ================= */}
        <div className="nav-actions">
          {/* Search Icon (mobile) */}
          <div
            className="mobile-only search-icon"
            onClick={() => setSearchOpen(true)}
          >
            <FaSearch size={18} />
          </div>

          {/* User */}
          <div className="nav-user" onClick={() => setUserOpen(!userOpen)}>
            <FaUserCircle size={24} />

            <AnimatePresence>
              {userOpen && (
                <motion.div
                  className="user-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {isAuthenticated ? (
                    <>
                      <h3>Welcome, {user.username || "User"}</h3>
                      <div className="logout" onClick={handleLogout}>
                        Logout
                        <IoLogOutOutline size={22} />
                      </div>
                    </>
                  ) : (
                    <>
                      <p
                        onClick={() => {
                          setAuthMode("login");
                          setAuthPopupOpen(true);
                          setUserOpen(false);
                        }}
                      >
                        Login
                      </p>
                      <p
                        onClick={() => {
                          setAuthMode("register");
                          setAuthPopupOpen(true);
                          setUserOpen(false);
                        }}
                      >
                        Register
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <div className="nav-cart" onClick={() => setCartOpen(true)}>
            <PiShoppingCartSimpleBold size={22} />
            <span className="items-count">{cartItems.length}</span>
          </div>

          {/* Hamburger */}
          <div
            className="hamburger mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </div>
        </div>
      </nav>

      {/* ================= Mobile Search ================= */}
      {searchOpen && (
        <div className="search-overlay">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaTimes
              className="close-search"
              onClick={() => setSearchOpen(false)}
            />
          </div>

          {searchTerm && (
            <div className="search-dropdown mobile-results">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="search-item"
                    onClick={() => {
                      OpenPopup(item);
                      setSearchTerm("");
                      setSearchOpen(false);
                    }}
                  >
                    <img src={item.image} alt={item.title} />
                    <div className="info">
                      <p className="title">{item.title}</p>
                      <p className="price">${item.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">No products found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= Cart Drawer ================= */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        userId={user?._id || user?.id}
      />
    </>
  );
}
