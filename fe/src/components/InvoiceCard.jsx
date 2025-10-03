import React from "react";
import formatNumber from "../utils/formatNumber";

const InvoiceCard = React.forwardRef(({ invoice, onClick }, ref) => {
  

  return (
    <div
      ref={ref}
      className="kyzn-card kyzn-card--invoice kyzn-card--full"
      onClick={() => onClick(invoice)}
    >
      <div className="kyzn-card-header">
        <div className="kyzn-invoice-no">{invoice.invoice_no}</div>
      </div>
      <div className="kyzn-divider"></div>
      <p><strong>Customer:</strong> {invoice.customer}</p>
      <p><strong>Salesperson:</strong> {invoice.salesperson}</p>
      <p><strong>Total Price:</strong> {formatNumber(invoice.total_price)}</p>
      {invoice.notes && <p><strong>Notes:</strong> {invoice.notes}</p>}
    </div>
  );
});

export default InvoiceCard;
