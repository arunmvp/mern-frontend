import React, { useState, useEffect, useContext } from "react";
import {
  FaTimes,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { ProductContext } from "../Contexts/PopupContext";
import { AuthContext } from "../Contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/CartSlice";
import axios from "axios";
import "./ProductPopup.css";

export default function ProductPopup() {
  const { popup, selectedProduct, ClosePopup } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  
  const dispatch = useDispatch();

  const { loading: cartLoading } = useSelector((state) => state.cart);

  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [favourite, setFavourite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [favMessage, setFavMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = popup ? "hidden" : "auto";
  }, [popup]);

  // Reset state when product changes
  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image || "");
      setSelectedVariant(null);
      setQty(1);
      setFavourite(false);
    }
  }, [selectedProduct, popup]);

  // Update main image when variant changes
  useEffect(() => {
    if (selectedVariant) setMainImage(selectedVariant.image || "");
    else if (selectedProduct) setMainImage(selectedProduct.image || "");
  }, [selectedVariant, selectedProduct]);

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => Math.max(1, q - 1));

  // Add to Cart
  const handleAddToCart = async () => {
    if (!user || !selectedProduct) {
      setCartMessage("Please login to add to cart");
      setTimeout(() => setCartMessage(""), 2000);
      return;
    }

    try {
      const payload = {
        userId: user?.id,
        productId: selectedProduct._id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.image,
        color: selectedVariant?.color || "default",
        quantity: qty,
      };

      console.log("Add to Cart Payload:", payload);

      await dispatch(addToCart(payload)).unwrap();

      setCartMessage("Added to cart");
    } catch (err) {
      console.error(err);
      setCartMessage("Error adding to cart");
    } finally {
      setTimeout(() => setCartMessage(""), 2000);
    }
  };

  // Favourite toggle
  const toggleFavourite = async () => {
    if (!user || !selectedProduct) return;
    setFavLoading(true);

    try {
      if (!favourite) {
        await axios.post("https://mern-backend-ev9c.onrender.com/api/auth/addfavourite", {
          userId: user.id,
          productId: selectedProduct._id,
        });
        setFavourite(true);
        setFavMessage("Added to favourites");
      } else {
        await axios.post("https://mern-backend-ev9c.onrender.com/api/auth/removefavourite", { 
          userId: user.id,
          productId: selectedProduct._id,
        });
        setFavourite(false);
        setFavMessage("Removed from favourites");
      }
    } catch (err) {
      console.error(err);
      setFavMessage("Error! Try again.");
    } finally {
      setTimeout(() => {
        setFavLoading(false);
        setFavMessage("");
      }, 2000);
    }
  };

  if (!popup || !selectedProduct) return null;

  const { title, description, price, oldprice, variants, brand } =
    selectedProduct;

  const discount = oldprice
    ? Math.round(((oldprice - price) / oldprice) * 100)
    : 0;

  return (
    <div className="ppm-overlay" onClick={ClosePopup}>
      <div className="ppm-card" onClick={(e) => e.stopPropagation()}>
        <div className="ppm-left">
          {mainImage ? (
            <img src={mainImage} alt={title} className="ppm-main-image" />
          ) : (
            <div className="ppm-placeholder">Loading image...</div>
          )}

          {variants && (
            <div className="ppm-thumbnails">
              {variants.slice(0, 3).map((v, i) => (
                <img
                  key={i}
                  src={v.image || ""}
                  alt={v.color || "variant"}
                  className={selectedVariant === v ? "selected" : ""}
                  onClick={() => setSelectedVariant(v)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="ppm-right">
          <button className="ppm-close" onClick={ClosePopup}>
            <FaTimes />
          </button>

          <h2>{title}</h2>
          {brand && <div className="ppm-brand">Brand: {brand}</div>}
          <p className="ppm-desc">{description}</p>

          <div className="ppm-price">
            <span>₹{price}</span>
            {oldprice && <span className="ppm-oldprice">₹{oldprice}</span>}
            {discount > 0 && <span className="ppm-discount">({discount}% OFF)</span>}
          </div>

          {variants && (
            <div className="ppm-colors">
              {variants.map((v, i) => (
                <button
                  key={i}
                  style={{ background: v.color }}
                  className={selectedVariant === v ? "selected" : ""}
                  onClick={() => setSelectedVariant(v)}
                />
              ))}
            </div>
          )}

          <div className="ppm-qty">
            <button onClick={dec}>-</button>
            <span>{qty}</span>
            <button onClick={inc}>+</button>
          </div>

          <div className="ppm-actions">
            <button
              className={cartLoading ? "ppm-addcart loading" : "ppm-addcart"}
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>

            <button
              className={`ppm-fav ${favourite ? "active" : ""} ${favLoading ? "loading" : ""}`}
              onClick={toggleFavourite}
              disabled={favLoading}
            >
              <FaHeart />
            </button>

            {favMessage && <div className="ppm-notification">{favMessage}</div>}
            {cartMessage && <div className="ppm-notification cart">{cartMessage}</div>}
          </div>

          <div className="ppm-social">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
}
