import { useEffect, useContext } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import "./CartDrawer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  updateCartQty,
  clearCart,
  fetchCart
} from "../../../Redux/CartSlice";


export default function CartDrawer({ open, onClose , userId}) {
  const dispatch = useDispatch();
  const { cartItems = [], loading } = useSelector((state) => state.cart);
  console.log(cartItems);
  
  useEffect(() => {
  if (userId) dispatch(fetchCart(userId));
}, [userId, dispatch]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  // Total price calculation
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => {
        if (!item || !item.price || !item.quantity) return sum;
        return sum + item.price * item.quantity;
      }, 0)
    : 0;

  // Increment
  const handleIncrement = (item) => {
    dispatch(incrementQty(item.productId));
    dispatch(
      updateCartQty({
        userId,
        productId: item.productId,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrement
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(decrementQty(item.productId));
      dispatch(
        updateCartQty({
          userId,
          productId: item.productId,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  // Remove item
  const handleRemove = (item) => {
    dispatch(removeFromCart({ userId, productId: item.productId }));
  };

  // Clear cart
  const handleClearCart = () => {
    dispatch(clearCart(userId));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <FaTimes onClick={onClose} className="close-icon" />
        </div>

        <div className="cart-items">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : !cartItems || cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty </p>
          ) : (
            cartItems.map((item, index) => {
              if (!item) return null;
              return (
                <div className="cart-item" key={item.productId || index}>
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    {/* <p>₹{item.price}</p> */}

                    <div className="qty-control">
                      <button onClick={() => handleDecrement(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)}>+</button>
                    </div>

                    <p className="subtotal">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item)}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn">Checkout</button>
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
