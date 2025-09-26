import React, { useState, useEffect, useContext } from "react";
import { FaTimes, FaHeart, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { ProductContext } from "../Contexts/PopupContext";
import "./ProductPopup.css";

export default function ProductPopup() {
  const { popup, selectedProduct, ClosePopup } = useContext(ProductContext);
  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    document.body.style.overflow = popup ? "hidden" : "auto";
  }, [popup]);

 useEffect(() => {
  if (selectedProduct) {
    setMainImage(selectedProduct.image); 
    setSelectedVariant(null);            
    setQty(1);                          
    setFavourite(false);                    
  }
}, [selectedProduct, popup]);

  useEffect(() => {
    if (selectedVariant) setMainImage(selectedVariant.image);
    else if (selectedProduct) setMainImage(selectedProduct.image);
  }, [selectedVariant, selectedProduct]);

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const toggleFavourite = () => setFavourite(f => !f);

  if (!popup || !selectedProduct) return null;

  const { title, description, price, oldprice, variants, brand } = selectedProduct;
  const discount = oldprice ? Math.round(((oldprice - price) / oldprice) * 100) : 0;

  return (
    <div className="ppm-overlay" onClick={ClosePopup}>
      <div className="ppm-card" onClick={e => e.stopPropagation()}>

        
        {/* Left Side */}
        <div className="ppm-left">
          <img src={mainImage} alt={title} className="ppm-main-image" />
          {variants && (
            <div className="ppm-thumbnails">
              {variants.slice(0, 3).map((v, i) => (
                <img
                  key={i}
                  src={v.image}
                  alt={v.color}
                  className={selectedVariant === v ? "selected" : ""}
                  onClick={() => setSelectedVariant(v)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="ppm-right">
        <button className="ppm-close" onClick={ClosePopup}><FaTimes /></button>
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
            <button className={loading ? "ppm-addcart loading" : "ppm-addcart"} onClick={handleAddToCart}>
              {loading ? "Adding..." : "Add to Cart"}
            </button>
            <button className={`ppm-fav ${favourite ? "active" : ""}`} onClick={toggleFavourite}>
              <FaHeart />
            </button>
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
