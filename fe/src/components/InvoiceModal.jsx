import React from "react";
import ReactDOM from "react-dom";
import formatNumber from "../utils/formatNumber";
import { mapPaymentTypeToLabel } from "../utils/paymentType";

const InvoiceModal = ({ invoice, onClose }) => {
  if (!invoice) return null;

  return ReactDOM.createPortal(
    <div className="kyzn-modal-overlay" onClick={onClose}>
      <div className="kyzn-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="kyzn-modal-close kyzn-modal-close--round"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="kyzn-modal-close-icon">×</span>
        </button>
        <h2 className="kyzn-modal-title">{invoice.invoice_no}</h2>
        <div className="kyzn-divider"></div>
        <div className="kyzn-modal-info">
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Customer:</strong> {invoice.customer}</p>
          <p><strong>Salesperson:</strong> {invoice.salesperson}</p>
          <p>
            <strong>Payment Type:</strong>{" "}
            {mapPaymentTypeToLabel(invoice.payment_type)}
          </p>
          <p><strong>Notes:</strong> {invoice.notes ? invoice.notes : "-"}</p>
          <p><strong>Total COGS:</strong> {formatNumber(invoice.total_cogs)}</p>
          <p><strong>Total Price:</strong> {formatNumber(invoice.total_price)}</p>
        </div>

        <h3 className="kyzn-modal-subtitle">Products</h3>
        <div className="kyzn-modal-products">
          <table className="kyzn-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Total COGS</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
            {invoice.products.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_name}</td>
                <td>{formatNumber(p.qty)}</td>
                <td>{formatNumber(p.total_cogs)}</td>
                <td>{formatNumber(p.total_price)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InvoiceModal;
