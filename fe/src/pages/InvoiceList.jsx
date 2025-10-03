import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoices, incrementPage, resetInvoices } from "../redux/invoiceListSlice";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invoices, status, page, per_page, hasMore } = useSelector(
    (state) => state.invoiceList
  );

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const observer = useRef();
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const debounceRef = useRef(false);

  const handleRetry = () => {
    dispatch(resetInvoices());
    dispatch(fetchInvoices({ page: 1, per_page }));
  };

  // Always refresh list when arriving on this page
  useEffect(() => {
    dispatch(resetInvoices());
    dispatch(fetchInvoices({ page: 1, per_page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, per_page]);

  // Fetch next pages when page increments via infinite scroll
  useEffect(() => {
    if (page > 1) {
      dispatch(fetchInvoices({ page, per_page }));
    }
  }, [dispatch, page, per_page]);

  // Dynamically size the list container to fill viewport below the header
  useEffect(() => {
    const updateListHeight = () => {
      if (!containerRef.current) return;
      const headerEl = headerRef.current;
      const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom : 0;
      const available = Math.max(200, window.innerHeight - headerBottom - 16); // 16px breathing room
      containerRef.current.style.maxHeight = `${available}px`;
    };
    updateListHeight();
    window.addEventListener("resize", updateListHeight);
    return () => window.removeEventListener("resize", updateListHeight);
  }, []);

  // Callback to observe the last invoice element
  const lastInvoiceRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (debounceRef.current) return; // debounce to prevent multiple triggers
      if (observer.current) observer.current.disconnect();
      
      // Fallback to document root if container isn't ready (for Brave/Chromium compatibility)
      const rootElement = containerRef.current || null;
      
      observer.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        console.log('IntersectionObserver triggered:', {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          hasMore,
          status
        });
        
        if (entry.isIntersecting && hasMore) {
          debounceRef.current = true;
          setTimeout(() => {
            dispatch(incrementPage());
            debounceRef.current = false;
          }, 300); // 300ms debounce
        }
      }, { 
        root: rootElement, 
        rootMargin: "100px 0px", // Add 100px buffer below the container
        threshold: 0.1 // Trigger when 10% of element is visible instead of 100%
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore, dispatch]
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div ref={headerRef} className="kyzn-header-row">
        <h1 className="kyzn-page-title" style={{ marginBottom: 0 }}>Invoices</h1>
        <button className="kyzn-primary-btn" onClick={() => navigate('/invoice-form')}>
          Create Invoice
        </button>
      </div>

      <div ref={containerRef} className="kyzn-list-container">
        <div className="kyzn-grid">
        {invoices.map((inv, idx) => {
          if (invoices.length === idx + 1) {
            // last item observed
            return (
              <InvoiceCard
                key={inv.id}
                invoice={inv}
                onClick={(invoice) => setSelectedInvoice(invoice)}
                ref={lastInvoiceRef}
              />
            );
          } else {
            return (
              <InvoiceCard
                key={inv.id}
                invoice={inv}
                onClick={(invoice) => setSelectedInvoice(invoice)}
              />
            );
          }
        })}
        </div>

        {/* Loading spinner inside scroll container */}
        {status === "loading" && (
          <div className="kyzn-list-loading">
            <div className="kyzn-spinner"></div>
          </div>
        )}

        {/* Empty state */}
        {invoices.length === 0 && status === "succeeded" && (
          <div className="kyzn-list-empty">No Invoice Available</div>
        )}

        {/* Error state */}
        {status === "failed" && (
          <div className="kyzn-error kyzn-error-clickable" onClick={handleRetry}>
            Failed to load invoices. Click to retry &#x21bb;
          </div>
        )}

        {/* No more message */}
        {!hasMore && status !== "loading" && invoices.length > 0 && (
          <div className="kyzn-list-empty">No more invoices</div>
        )}
      </div>

      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
};

export default InvoiceList;
