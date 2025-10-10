import "./Sidebar.css";
import { useState, useEffect, useContext } from "react";
import Slider from "@mui/material/Slider";
import { FilterContext } from "../Contexts/FilterContex";
import shoe1 from "../../assets/shoe1.png";
import shoe2 from "../../assets/shoe2.png";
import shoe3 from "../../assets/shoe3.png";

export default function Sidebar() {
  const { brand, setBrandFilter, priceRange, handlePriceChange } =
    useContext(FilterContext);

  const colors = ["red", "blue", "green", "black", "gray", "yellow"];
  const brands = ["All", "Nike", "Adidas", "Puma", "Vans", "Airmax", "Reebok"];

  // ============ IMAGE SLIDER LOGIC ============
  const images = [shoe1, shoe2, shoe3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(false); // fade-in new image
      }, 0);
    }, 5000); // change every 3 sec
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <aside className="sidebar">
      {/* BRAND FILTER */}
      <div className="filter-section">
        <h4>BRAND</h4>
        <ul style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {brands.map((b) => (
            <li
              key={b}
              onClick={() => setBrandFilter(b)}
              style={{ cursor: "pointer" }}
              className={brand === b ? "brandactive" : ""}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE RANGE */}
      <div className="filter-section">
        <h4>PRICES</h4>
        <h6>
          Range:{" "}
          <span>
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </h6>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          min={10}
          max={200}
          sx={{ color: "#2db8fdff", width: "90%" }}
        />
      </div>

      {/* IMAGE BANNER with FADE ANIMATION */}
      <div className={`imgban ${fade ? "fade-out" : "fade-in"}`}>
        <img
          src={images[currentIndex]}
          alt="banner"
          style={{
            width: "315px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "opacity 0.5s all",
          }}
        />
      </div>
    </aside>
  );
}
