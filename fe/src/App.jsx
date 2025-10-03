import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InvoiceForm from "./pages/InvoiceForm";
import TimeSeriesRevenue from "./pages/TimeSeriesRevenue";
import InvoiceList from "./pages/InvoiceList";

const App = () => {
  return (
    <SidebarLayout>
      <Routes>
        <Route path="/invoice-form" element={<InvoiceForm />} />
        <Route path="/revenues" element={<TimeSeriesRevenue />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="*" element={<InvoiceList />} /> {/* Default */}
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} newestOnTop />
    </SidebarLayout>
  );
};

export default App;
