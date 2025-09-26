import React, { useContext } from "react";
import "./ProductFilterBar.css";
import { CgMenuGridR } from "react-icons/cg";
import { TbMenu2 } from "react-icons/tb";
import { SetGridContext } from "../Contexts/GridContext";
import { FilterContext } from "../Contexts/FilterContex";

const ProductFilterBar = () => {
  const { grid, toggleGrid } = useContext(SetGridContext);
  const { filter, toggleFilter } = useContext(FilterContext);
  const { count } = useContext(FilterContext);

  const sortOptions = [
    { value: "All", label: "All" },
    { value: "name", label: "Name" },
    { value: "priceLowToHigh", label: "Price - Low to High" },
    { value: "priceHighToLow", label: "Price - High to Low" },
    { value: "newest", label: "Newest Arrivals" },
  ];

  const showOptions = [12, 24, 48, 96];

  return (
    <div className="filter-bar">
      <div className="filter-bar-content">
        <h4>{count} Items</h4>
        <div>
          <span>Sort by</span>
          <select
            id="sortbar"
            onChange={(e) => toggleFilter(e)}
            value={filter}
          >
            {sortOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
      </div>
      <div className="filter-bar-icons">
        <div
          onClick={toggleGrid}
          className={`${grid ? "icon active" : "icon"}`}
        >
          <CgMenuGridR size={32} className={grid && "icon2 active2"} />
        </div>
        <div
          onClick={toggleGrid}
          className={`${grid ? "icon" : "icon active"}`}
        >
          <TbMenu2 size={32} className={!grid && "icon2 active2"} />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterBar;
