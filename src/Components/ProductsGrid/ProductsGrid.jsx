import React, { useEffect, useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";
import { SetGridContext } from "../Contexts/GridContext";
import { FilterContext } from "../Contexts/FilterContex";
import { useSelector } from "react-redux";

const ProductsGrid = () => {
  const { grid } = useContext(SetGridContext);
  const { filter, setCountItems, brand, priceRange } = useContext(FilterContext);
  const products = useSelector((state) => state.products.products);

  // 🔹 Step 1: Apply sorting
  let sortedProducts = [...products];
  if (filter === "name") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filter === "priceLowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (filter === "priceHighToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (filter === "newest") {
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  // 🔹 Step 2: Apply brand filter
  let brandFiltered =
    brand && brand !== "All"
      ? sortedProducts.filter(
          (product) => product.brand.toLowerCase() === brand.toLowerCase()
        )
      : sortedProducts;

  // 🔹 Step 3: Apply price filter
  let finalProducts =
    priceRange && priceRange.length === 2
      ? brandFiltered.filter(
          (product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        )
      : brandFiltered;

  // 🔹 Step 4: Update count
  useEffect(() => {
    setCountItems(finalProducts.length);
  }, [filter, brand, priceRange, products, finalProducts.length, setCountItems]);

  return (
    <>
      {grid ? (
        <div className="products-grid">
          {finalProducts.map((product) => (
            <ProductCard key={product._id} product={product} grid={true} />
          ))}
        </div>
      ) : (
        <div className="products-grid row-layout">
          {finalProducts.map((product) => (
            <ProductCard key={product._id} product={product} grid={false} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
