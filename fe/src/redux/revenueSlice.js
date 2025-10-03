import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRevenue } from "../api/revenueApi";

export const fetchRevenue = createAsyncThunk(
  "revenue/fetchRevenue",
  async ({ period }) => {
    return await getRevenue(period);
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    period: "daily",
  },
  reducers: {
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Extract the data array from the API response
        state.data = action.payload?.data || [];
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPeriod } = revenueSlice.actions;

export default revenueSlice.reducer;
