import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  error: null,
  loading: false,
};

export const createOrder = createAsyncThunk(
  "checkout/createOrder",
  async ({ userId, shippingAddress }) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, shippingAddress }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error.message;
    }
  }
);

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
