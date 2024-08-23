import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await fetch("http://localhost:3000/brands");
  return response.json();
});

export const addBrand = createAsyncThunk("brands/addBrand", async (brand) => {
  const response = await fetch("http://localhost:3000/brands", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(brand),
  });
  return response.json();
});

export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async (brand) => {
    const response = await fetch(`http://localhost:3000/brands/${brand.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });
    return response.json();
  }
);

export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id) => {
    await fetch(`http://localhost:3000/brands/${id}`, { method: "DELETE" });
    return id;
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex(
          (brand) => brand.id === action.payload.id
        );
        state.brands[index] = action.payload;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (brand) => brand.id !== action.payload
        );
      });
  },
});

export default brandSlice.reducer;
