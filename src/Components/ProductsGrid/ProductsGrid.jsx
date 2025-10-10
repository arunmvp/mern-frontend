import React, { useEffect, useContext, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";
import { SetGridContext } from "../Contexts/GridContext";
import { FilterContext } from "../Contexts/FilterContex";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const ProductsGrid = () => {
  const { grid } = useContext(SetGridContext);
  const { filter, setCountItems, brand, priceRange } = useContext(FilterContext);
  const products = useSelector((state) => state.products.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 12;

  // 🔹 Sorting
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

  // 🔹 Brand Filter
  let brandFiltered =
    brand && brand !== "All"
      ? sortedProducts.filter(
          (product) => product.brand.toLowerCase() === brand.toLowerCase()
        )
      : sortedProducts;

  // 🔹 Price Filter
  let finalProducts =
    priceRange && priceRange.length === 2
      ? brandFiltered.filter(
          (product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        )
      : brandFiltered;

  // 🔹 Pagination Logic
  const totalPages = Math.ceil(finalProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = finalProducts.slice(
    startIdx,
    startIdx + productsPerPage
  );

  useEffect(() => {
    setCountItems(finalProducts.length);
  }, [filter, brand, priceRange, products, finalProducts.length, setCountItems]);

  // 🔹 Handle page change with animation
  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500); // animation delay
  };

  return (
    <div className="products-container">
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className={`products-grid ${!grid ? "row-layout" : ""}`}
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                grid={grid}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* 🔹 Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
