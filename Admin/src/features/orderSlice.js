import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create an async thunk for fetching orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch("http://localhost:3000/orders");
  return response.json();
});
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting message");
      }
      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the orders slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the orders reducer
export default ordersSlice.reducer;
