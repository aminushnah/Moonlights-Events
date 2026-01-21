import React, { useState } from 'react';

const emptyForm = {
  name: '',
  category: '',
  quantity: '',
  status: 'In Stock',
};

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Dining Table', category: 'Furniture', quantity: 24, status: 'In Stock' },
    { id: 2, name: 'Chair', category: 'Furniture', quantity: 156, status: 'In Stock' },
    { id: 3, name: 'Chandelier', category: 'Lighting', quantity: 12, status: 'Low Stock' },
    { id: 4, name: 'Table Cloth', category: 'Textiles', quantity: 89, status: 'In Stock' },
    { id: 5, name: 'Sound System', category: 'Audio', quantity: 5, status: 'Low Stock' },
  ]);

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openNewModal = () => {
    setIsEditing(false);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item, index) => {
    setIsEditing(true);
    setSelectedIndex(index);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setInventoryItems(prev =>
        prev.map((item, i) => (i === selectedIndex ? formData : item))
      );
    } else {
      setInventoryItems(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setFormData(emptyForm);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage your rental equipment and items
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black/90 transition flex items-center gap-2"
        >
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
      <div className="bg-white dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-neutral-800 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Item Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {filteredItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm">{item.category}</td>
                <td className="px-6 py-4 text-sm font-semibold">{item.quantity}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'In Stock'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                        : item.status === 'Low Stock'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => openEditModal(item, index)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setInventoryItems(prev => prev.filter((_, i) => i !== index))
                    }
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white dark:bg-card-dark w-full max-w-lg rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Inventory Item' : 'Add Inventory Item'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-500">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Quantity</label>
                <input
                  type="number"
                  min="0"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                >
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border dark:border-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-black/90"
                >
                  {isEditing ? 'Update Item' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
