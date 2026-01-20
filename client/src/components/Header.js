import React from 'react';

function Header() {
  return (
    <header className="h-16 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-1.5 w-96">
        <span className="material-icons-outlined text-gray-400 mr-2">search</span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-gray-400 outline-none dark:text-white"
        />
      </div>

      <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
        <img className="w-8 h-8 rounded-full border border-gray-300" src="/images/logo.jpg" alt="Admin" />
        <span className="font-semibold text-sm">Admin</span>
      </button>
    </header>
  );
}

export default Header;
