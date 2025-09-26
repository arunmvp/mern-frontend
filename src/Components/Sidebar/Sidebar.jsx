import "./Sidebar.css";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import {FilterContext} from "../Contexts/FilterContex";
import { useContext } from "react";

export default function Sidebar() {
  const [colorValue, setColorValue] = useState(null);
  const {brand, setBrandFilter, priceRange, handlePriceChange} = useContext(FilterContext) 


  const colors = ["red", "blue", "green", "black", "gray", "yellow"];
  const brands = ["All","Nike", "Adidas", "Puma", "Vans", "Airmax", "Reebok"];

  return (
    <aside className="sidebar">

      <div className="filter-section">
        <h4>BRAND</h4>
        <ul style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {brands.map((b) => (
            <li key={b} onClick={()=> setBrandFilter(b)} style={{ cursor: "pointer" }} className={brand===b ? "brandactive" : ""}>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE RANGE */}
      <div className="filter-section">
        <h4>PRICES</h4>
        <h6>
          Range: <span>${priceRange[0]} - ${priceRange[1]}</span>
        </h6>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
            min={10}
          max={200}
          sx={{ color: "#2db8fdff" , width: "90%" }}
        />
      </div>


      {/* BRAND */}
      
    </aside>
  );
}
