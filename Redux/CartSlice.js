import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Load cart from localStorage initially
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: savedCart,
  loading: false,
  error: null,
};

// ================= FETCH CART =================
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://mern-backend-ev9c.onrender.com/api/cart/${userId}`);
      const data = res.data.cartItems || [];
      localStorage.setItem("cartItems", JSON.stringify(data)); // save to localStorage
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= ADD TO CART =================
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`https://mern-backend-ev9c.onrender.com/api/cart/add`, payload);
      const data = res.data.cartItems || [];
      localStorage.setItem("cartItems", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= REMOVE FROM CART =================
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`https://mern-backend-ev9c.onrender.com/api/cart/remove`, {
        userId,
        productId,
      });
      const data = res.data.cartItems || [];
      localStorage.setItem("cartItems", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= UPDATE QUANTITY =================
export const updateCartQty = createAsyncThunk(
  "cart/updateCartQty",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`https://mern-backend-ev9c.onrender.com/api/cart/update`, {
        userId,
        productId,
        quantity,
      });
      const data = res.data.cartItems || [];
      localStorage.setItem("cartItems", JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= CLEAR CART =================
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`https://mern-backend-ev9c.onrender.com/api/cart/clear`, { userId });
      localStorage.removeItem("cartItems"); // remove from localStorage
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Optimistic updates
    incrementQty: (state, action) => {
      const productId = action.payload;
      if (!productId) return;
      const item = state.cartItems.find((i) => i?.productId === productId);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementQty: (state, action) => {
      const productId = action.payload;
      if (!productId) return;
      const item = state.cartItems.find((i) => i?.productId === productId);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== FETCH ==========
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== ADD ==========
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ========== REMOVE ==========
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ========== UPDATE QTY ==========
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];
      })
      .addCase(updateCartQty.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ========== CLEAR ==========
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
