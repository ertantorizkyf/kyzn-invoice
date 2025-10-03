import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import invoiceListReducer from "./invoiceListSlice";
import productReducer from "./productSlice";
import revenueReducer from "./revenueSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    invoiceList: invoiceListReducer,
    products: productReducer,
    revenue: revenueReducer,
  },
});
