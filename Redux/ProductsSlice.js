import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null
};

// ✅ Fetch products
export const allproducts = createAsyncThunk(
  "products/allproducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://mern-backend-ev9c.onrender.com/api/products");
      return res.data;  // correct: return fetched data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(allproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
