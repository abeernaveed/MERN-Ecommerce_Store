import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, id) => {
    const response = await fetch("http://127.0.0.1:3000/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  }
);

export const getCartById = createAsyncThunk("cart/getCartById", async (id) => {
  const response = await fetch(`http://127.0.0.1:3000/carts/${id}`);
  return response.json();
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    const response = await fetch(
      `http://127.0.0.1:3000/carts/${userId}/${productId}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get cart by id
      .addCase(getCartById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartById.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.cart = state.cart.cartItems.filter(
            (product) => product.id !== action.payload.id
          );
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
