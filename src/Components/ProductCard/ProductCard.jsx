import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./ProductCard.css"; // same css file, wide style add pannunga
import "./WideCard.css";
import { useContext } from "react";
import { ProductContext } from "../Contexts/PopupContext";

const ProductCard = ({ product, grid  }) => {
  const { title, description, image, price, oldprice, rating, isHot, image2, variants } = product;

  const percentage = oldprice ? ((oldprice - price) / oldprice) * 100 : 0;
  const roundedPercentage = Math.round(percentage);

  const [currentImage, setCurrentImage] = useState(false);
  const secondImage = image2 || image;

  const { OpenPopup } = useContext(ProductContext) 

  return (
    <div className={grid ? "product-card" : "product-card-wide"} onClick={()=>{OpenPopup(product)}}>
      {isHot && <span className="badge">HOT</span>}

      <div
        className={grid ? "product-img" : "product-img-wide"}
        onMouseEnter={() => setCurrentImage(true)}
        onMouseLeave={() => setCurrentImage(false)}
      >
        <img
          src={variants?.[0]?.image || image}
          alt={title}
          className={currentImage ? "fade-out" : "fade-in"}
        />
        <img
          src={secondImage}
          alt={title}
          className={currentImage ? "fade-in" : "fade-out"}
        />
      </div>

      <div className={grid ? "product-info" : "product-info-wide"}>
        <h3>{title}</h3>
        {!grid && <p className="description">{description}</p>}

        <div className="rating">
          {[...Array(5)].map((_, i) =>
            i < rating ? (
              <FaStar key={i} className="star filled" />
            ) : (
              <FaRegStar key={i} className="star" />
            )
          )}
        </div>

        <div className="price-section">
          <span className="price">${price}</span>
          {oldprice && <span className="old-price">${oldprice}</span>}
          {oldprice && (
            <span className="discount">({roundedPercentage}% OFF)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
