import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createInvoice as createInvoiceApi } from "../api/invoiceApi";

const initialState = {
  date: "",
  customer: "",
  salesperson: "",
  payment_type: "",
  notes: "",
  products: [{ product_id: "", qty: 1 }],
  createStatus: "idle", // idle | loading | succeeded | failed
  createError: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state) => {
      state.products.push({ product_id: "", qty: 1 });
    },
    removeProduct: (state) => {
      if (state.products.length > 1) {
        state.products.pop();
      }
    },
    deleteProductAt: (state, action) => {
      const index = action.payload;
      if (state.products.length <= 1) return;
      state.products.splice(index, 1);
    },
    resetInvoice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createInvoice.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || action.error?.message || "Unknown error";
      });
  },
});

// Async thunk to create an invoice
export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createInvoiceApi(payload);
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Failed to create invoice";
      return rejectWithValue(message);
    }
  }
);

export const {
  setField,
  setProducts,
  addProduct,
  removeProduct,
  deleteProductAt,
  resetInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
