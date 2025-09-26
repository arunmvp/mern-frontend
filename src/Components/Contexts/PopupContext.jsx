import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const PopupContext = ({ children }) => {
  const [popup, setPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // NEW

  const OpenPopup = (product) => {
    setSelectedProduct(product); // store the product
    setPopup(true);
  };

  const ClosePopup = () => {
    setPopup(false);
    setSelectedProduct(null);
  };

  return (
    <ProductContext.Provider value={{ popup, selectedProduct, OpenPopup, ClosePopup }}>
      {children}
    </ProductContext.Provider>
  );
};

export default PopupContext;
