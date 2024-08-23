import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMails = createAsyncThunk("mails/fetchMails", async () => {
  const response = await fetch("http://127.0.0.1:3000/message");
  return response.json();
});

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/message/${messageId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting message");
      }
      return messageId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const mailSlice = createSlice({
  name: "mails",
  initialState: {
    mails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.loading = false;
        state.mails = action.payload;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mailSlice.reducer;
