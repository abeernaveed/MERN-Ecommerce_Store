import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to save message to database
export const saveMessage = createAsyncThunk(
  "messages/saveMessage",
  async ({ name, email, message }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return; // No need to return the message
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Message slice
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;
