import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductInput from "../components/ProductInput";
import {
  setField,
  addProduct,
  removeProduct,
  deleteProductAt,
  setProducts,
  resetInvoice,
} from "../redux/invoiceSlice";
import { toast } from "react-toastify";
import { createInvoice } from "../redux/invoiceSlice";
import { useNavigate } from "react-router-dom";

const paymentOptions = [
  { label: "Cash", value: "CASH" },
  { label: "Credit", value: "CREDIT" },
  { label: "Other", value: "NOTCASHORCREDIT" },
];

const InvoiceForm = () => {
  const form = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Reset form when component mounts (when navigating to this page)
  useEffect(() => {
    dispatch(resetInvoice());
  }, [dispatch]);

  // Top-level input change
  const handleChange = (e) => {
    dispatch(setField({ field: e.target.name, value: e.target.value }));
  };

  // Product input change
  const handleProductChange = (index, product) => {
    const updated = [...form.products];
    updated[index] = product;
    dispatch(setProducts(updated));
  };

  // Submit (validate then call API)
  const handleSubmit = async () => {
    const { date, customer, salesperson, payment_type, products } = form;

    if (!date || !customer || !salesperson || !payment_type) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!products.length || products.some((p) => !p.product_id || !p.qty)) {
      toast.error("Please fill all product fields and quantity must be at least 1");
      return;
    }
    const payload = {
      date,
      customer,
      salesperson,
      payment_type,
      notes: form.notes || "",
      products: products.map((p) => ({ product_id: p.product_id, qty: p.qty })),
    };
    const action = await dispatch(createInvoice(payload));
    if (createInvoice.fulfilled.match(action)) {
      toast.success("Invoice created successfully");
      navigate("/invoices");
    } else {
      toast.error(action.payload || action.error?.message || "Failed to create invoice");
    }
  };

  return (
    <div className="kyzn-container">
      <h1 className="kyzn-page-title mb-4">Create Invoice</h1>

      {/* Compute validity for button styling */}
      {(() => {
        const hasProducts = form.products.length > 0 && !form.products.some((p) => !p.product_id || !p.qty);
        const allRequired = form.date && form.customer && form.salesperson && form.payment_type;
        // @ts-ignore - only for UI state
        window.__invoice_valid__ = allRequired && hasProducts;
      })()}

      <section className="mb-6">
        <h2 className="kyzn-section-title">Invoice Info</h2>

        <div className="kyzn-form">
          <div className="kyzn-form-row">
            <label className="kyzn-label">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="kyzn-input"
            />
          </div>

          <div className="kyzn-form-row">
            <label className="kyzn-label">Customer</label>
            <input
              type="text"
              name="customer"
              value={form.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="kyzn-input"
            />
          </div>

          <div className="kyzn-form-row">
            <label className="kyzn-label">Salesperson</label>
            <input
              type="text"
              name="salesperson"
              value={form.salesperson}
              onChange={handleChange}
              placeholder="Enter salesperson"
              className="kyzn-input"
            />
          </div>

          <div className="kyzn-form-row">
            <label className="kyzn-label">Payment Type</label>
            <select
              name="payment_type"
              value={form.payment_type}
              onChange={handleChange}
              className="kyzn-select"
            >
              <option value="">Select</option>
              {paymentOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="kyzn-form-row kyzn-form-row--top">
            <label className="kyzn-label">Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Add any additional notes here"
              className="kyzn-textarea"
            />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="kyzn-section-title">Products</h2>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <button type="button" onClick={() => dispatch(addProduct())} className="kyzn-btn kyzn-btn--add">+ Add Product</button>
          <button type="button" onClick={() => dispatch(removeProduct())} className="kyzn-btn kyzn-btn--remove">− Remove Product</button>
        </div>

        <div className="" style={{ display: "grid", gap: 12 }}>
          {form.products.map((prod, idx) => (
            <ProductInput
              key={idx}
              index={idx}
              product={prod}
              onChange={handleProductChange}
              onDelete={(index) => dispatch(deleteProductAt(index))}
            />
          ))}
        </div>
      </section>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        {(() => {
          const { date, customer, salesperson, payment_type, products } = form;
          const isValid =
            !!date &&
            !!customer &&
            !!salesperson &&
            !!payment_type &&
            products.length > 0 &&
            !products.some((p) => !p.product_id || !p.qty);

        const creating = form.createStatus === "loading";
        return (
          <button
            type="button"
            onClick={handleSubmit}
            className={`kyzn-btn kyzn-btn--submit${!isValid || creating ? "-disabled" : ""}`}
          >
            {creating ? "Submitting..." : "Submit"}
          </button>
        );})()}
      </div>
    </div>
  );
};

export default InvoiceForm;
