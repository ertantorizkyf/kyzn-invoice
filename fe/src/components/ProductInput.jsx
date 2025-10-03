import ProductDropdown from "./ProductDropdown";

const ProductInput = ({ index, product, onChange, onDelete }) => {
  return (
    <div className="kyzn-product-card">
      <div className="kyzn-product-row">
        <div style={{ minWidth: 260, flex: 1 }}>
          <ProductDropdown
            value={product.product_id}
            onChange={(value) => onChange(index, { ...product, product_id: value })}
          />
        </div>

        <input
          type="number"
          min={1}
          value={product.qty}
          onChange={(e) => onChange(index, { ...product, qty: parseInt(e.target.value) })}
          placeholder="Qty"
          className="kyzn-input kyzn-qty-input"
        />

        <button
          type="button"
          onClick={() => onDelete(index)}
          aria-label="Delete product"
          className="kyzn-btn kyzn-btn--icon-red"
        >
          {/* trash icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductInput;
