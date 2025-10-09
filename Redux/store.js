import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice"; 
import CartReducer from './CartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: CartReducer
  },
});
