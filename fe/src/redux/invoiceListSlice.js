import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInvoices } from "../api/invoiceApi";

export const fetchInvoices = createAsyncThunk(
  "invoiceList/fetchInvoices",
  async ({ page, per_page }) => {
    return await getInvoices(page, per_page);
  }
);

const invoiceListSlice = createSlice({
  name: "invoiceList",
  initialState: {
    invoices: [],
    status: "idle",
    error: null,
    page: 1,
    per_page: 10,
    hasMore: true,
  },
  reducers: {
    resetInvoices: (state) => {
      state.invoices = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newItems = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
        if (newItems.length < state.per_page) {
          state.hasMore = false;
        }
        state.invoices.push(...newItems);
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetInvoices, incrementPage } = invoiceListSlice.actions;

export default invoiceListSlice.reducer;
