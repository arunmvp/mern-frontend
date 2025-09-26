import { FaTimes } from "react-icons/fa";
import "./CartDrawer.css";
import { useEffect } from "react";
import logo from '../../assets/logo/logo.png'

export default function CartDrawer({ open, onClose }) {
    
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [open]);

  return (
    <>
      <div
        className={`cart-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <FaTimes onClick={onClose} className="close-icon" />
        </div>

        <div className="cart-items">
          {/* Example Product Card */}
          <div className="cart-item">
            <img src={logo} alt="product" />
            <div className="item-details">
              <h4>Nike Sneakers</h4>
              <p>Color: Red</p>
              <div className="qty-control">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <p className="subtotal">$60.00</p>
            </div>
          </div>
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <strong>$120.00</strong>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </>
  );
}
