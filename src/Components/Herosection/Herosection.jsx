import React from "react";
import "./Herosection.css";
import BannerImage from "../../assets/bannerimg.png";

const Herosection = () => {
  return (
    <div className="heroBanner">
        <div className="banner-content">
          <h1>
            Adidas Men Running <br /> <span>Sneakers</span>
          </h1>
          <p>Performance and design. Taken right to the edge.</p>
          <a href="#" className="shop-btn">
            SHOP NOW
          </a>
        </div>
        <div>
            <img src={BannerImage} alt="" />
        </div>
    </div>
  );
};

export default Herosection;
