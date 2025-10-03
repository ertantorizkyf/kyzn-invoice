import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  return (
    <div className="kyzn-layout">
      <aside className="kyzn-sidebar">
        <div className="kyzn-brand">KYZN Invoice</div>
        <nav className="kyzn-nav">
          <div className="kyzn-nav-group">
            <div className="kyzn-nav-group-title">Invoice</div>
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                `kyzn-nav-link ${isActive ? "is-active" : ""}`
              }
            >
              Invoice List
            </NavLink>
            <NavLink
              to="/invoice-form"
              className={({ isActive }) =>
                `kyzn-nav-link ${isActive ? "is-active" : ""}`
              }
            >
              Create Invoice
            </NavLink>
          </div>

          <div className="kyzn-nav-group">
            <div className="kyzn-nav-group-title">Revenue</div>
            <NavLink
              to="/revenues"
              className={({ isActive }) =>
                `kyzn-nav-link ${isActive ? "is-active" : ""}`
              }
            >
              Revenue
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="kyzn-main">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;



