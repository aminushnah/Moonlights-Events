import React, { useState } from 'react';

function Orders() {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    { id: 'ORD-1001', client: 'John Doe', items: 5, amount: '$2,450', status: 'Pending', date: '2024-01-15' },
    { id: 'ORD-1002', client: 'Jane Smith', items: 3, amount: '$1,890', status: 'Completed', date: '2024-01-14' },
    { id: 'ORD-1003', client: 'Mike Johnson', items: 7, amount: '$3,200', status: 'In Transit', date: '2024-01-13' },
    { id: 'ORD-1004', client: 'Sarah Wilson', items: 4, amount: '$1,560', status: 'Completed', date: '2024-01-12' },
    { id: 'ORD-1005', client: 'David Brown', items: 6, amount: '$2,890', status: 'Pending', date: '2024-01-11' },
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200';
      case 'In Transit':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Orders & Rentals</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage all your rental orders</p>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black/90 transition flex items-center gap-2">
          <span className="material-icons-outlined">add</span>
          New Order
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark mb-6">
        <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-lg px-4 py-2">
          <span className="material-icons-outlined text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search orders by ID or client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 bg-transparent border-none focus:ring-0 w-full outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-neutral-800 border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Items</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                <td className="px-6 py-4 text-sm font-medium text-primary dark:text-blue-400">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.client}</td>
                <td className="px-6 py-4 text-sm">{order.items}</td>
                <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{order.date}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-primary dark:text-blue-400 hover:underline">View</button>
                  <button className="text-primary dark:text-blue-400 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
