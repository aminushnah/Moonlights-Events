import React, { useState } from 'react';

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryItems = [
    { id: 1, name: 'Dining Table', category: 'Furniture', quantity: 24, status: 'In Stock' },
    { id: 2, name: 'Chair', category: 'Furniture', quantity: 156, status: 'In Stock' },
    { id: 3, name: 'Chandelier', category: 'Lighting', quantity: 12, status: 'Low Stock' },
    { id: 4, name: 'Table Cloth', category: 'Textiles', quantity: 89, status: 'In Stock' },
    { id: 5, name: 'Sound System', category: 'Audio', quantity: 5, status: 'Low Stock' },
  ];

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your rental equipment and items</p>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black/90 transition flex items-center gap-2">
          <span className="material-icons-outlined">add</span>
          Add Item
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark mb-6">
        <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-lg px-4 py-2">
          <span className="material-icons-outlined text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 bg-transparent border-none focus:ring-0 w-full outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-neutral-800 border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Item Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm">{item.category}</td>
                <td className="px-6 py-4 text-sm font-semibold">{item.quantity}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'In Stock'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-primary dark:text-blue-400 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
