import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isDark, toggleTheme }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Set active link based on current route
    const path = location.pathname;
    setActiveLink(path);
  }, [location]);

  const isActive = (path) => {
    return activeLink === path ? "active" : "";
  };

  return (
    <aside className="w-64 border-r border-gray-300 dark:border-gray-800 bg-white dark:bg-card-dark flex flex-col fixed h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="Moon Light Events Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-primary dark:text-white text-base font-bold leading-tight">
              Moon Light Events
            </h1>
            <p className="text-secondary text-xs font-normal">
              Rental Management
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <Link
          to="/dashboard"
          className={`sidebar-item ${isActive("/dashboard")} flex items-center gap-3 p-3 rounded-lg transition-all`}
        >
          <span className="material-icons-outlined">dashboard</span>
          Dashboard
        </Link>

        <Link
          to="/purchases"
          className={`sidebar-item ${isActive("/purchases")} flex items-center gap-3 p-3 rounded-lg transition-all`}
        >
          <span className="material-icons-outlined">shopping_bag</span>
          Purchases
        </Link>

        <Link
          to="/inventory"
          className={`sidebar-item ${isActive("/inventory")} flex items-center gap-3 p-3 rounded-lg transition-all`}
        >
          <span className="material-icons-outlined">inventory_2</span>
          Inventory
        </Link>

        <Link
          to="/quotations"
          className={`sidebar-item ${isActive("/quotations")} flex items-center gap-3 p-3 rounded-lg transition-all`}
        >
          <span className="material-icons-outlined">request_quote</span>
          Quotations
        </Link>

        <Link
          to="/orders"
          className={`sidebar-item ${isActive("/orders")} flex items-center gap-3 p-3 rounded-lg transition-all`}
        >
          <span className="material-icons-outlined">shopping_cart</span>
          Orders & Rentals
        </Link>

        <button
          disabled
          className="sidebar-item flex items-center gap-3 p-3 rounded-lg text-gray-400 cursor-not-allowed hover:bg-transparent transition-all opacity-50"
        >
          <span className="material-icons-outlined">receipt_long</span>
          Invoices & Payments (Coming Soon)
        </button>
      </nav>

      <div className="p-4 border-t border-border-light dark:border-border-dark">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
        >
          <span className="material-icons-outlined">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
