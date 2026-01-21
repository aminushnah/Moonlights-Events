import React from 'react';

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Welcome back, here's what's happening today.</p>

      {/* Stats-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-primary dark:text-white">1,234</p>
            </div>
            <span className="material-icons-outlined text-primary dark:text-white text-4xl opacity-20">shopping_cart</span>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-primary dark:text-white">$45,678</p>
            </div>
            <span className="material-icons-outlined text-primary dark:text-white text-4xl opacity-20">trending_up</span>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm">Active Rentals</p>
              <p className="text-2xl font-bold text-primary dark:text-white">89</p>
            </div>
            <span className="material-icons-outlined text-primary dark:text-white text-4xl opacity-20">warehouse</span>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm">Total Customers</p>
              <p className="text-2xl font-bold text-primary dark:text-white">456</p>
            </div>
            <span className="material-icons-outlined text-primary dark:text-white text-4xl opacity-20">people</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark">
        <div className="p-6 border-b border-border-light dark:border-border-dark">
          <h2 className="text-lg font-bold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-neutral-700 transition">
                  <td className="px-6 py-4 text-sm">ORD-{1000 + i}</td>
                  <td className="px-6 py-4 text-sm">Customer {i}</td>
                  <td className="px-6 py-4 text-sm">$1,234.00</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
