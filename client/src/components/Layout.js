import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ toggleTheme, isDark }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 min-h-screen flex">
      <Sidebar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="ml-64 flex-1 min-h-screen flex flex-col">
        <Header toggleTheme={toggleTheme} isDark={isDark} />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
