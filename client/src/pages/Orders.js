import React, { useState } from 'react';

function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null); // null = new order, object = edit order

  const [orders, setOrders] = useState([
    { id: 'ORD-1001', client: 'John Doe', items: 5, amount: '$2,450', status: 'Pending', date: '2024-01-15' },
    { id: 'ORD-1002', client: 'Jane Smith', items: 3, amount: '$1,890', status: 'Completed', date: '2024-01-14' },
    { id: 'ORD-1003', client: 'Mike Johnson', items: 7, amount: '$3,200', status: 'In Transit', date: '2024-01-13' },
    { id: 'ORD-1004', client: 'Sarah Wilson', items: 4, amount: '$1,560', status: 'Completed', date: '2024-01-12' },
    { id: 'ORD-1005', client: 'David Brown', items: 6, amount: '$2,890', status: 'Pending', date: '2024-01-11' },
  ]);

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

  const openModalForNew = () => {
    setCurrentOrder(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedOrder = {
      id: form.orderId.value,
      client: form.clientName.value,
      items: Number(form.items.value),
      amount: `$${Number(form.amount.value).toLocaleString()}`,
      status: form.status.value,
      date: form.orderDate.value
    };

    if (currentOrder) {
      // Edit existing order
      setOrders(orders.map(o => o.id === currentOrder.id ? updatedOrder : o));
    } else {
      // Add new order
      setOrders([...orders, updatedOrder]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Orders & Rentals</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage all your rental orders
          </p>
        </div>
        <button
          onClick={openModalForNew}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black/90 transition flex items-center gap-2"
        >
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
      <div className="bg-white dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-neutral-800 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Items</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                <td className="px-6 py-4 text-sm font-medium text-primary">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.client}</td>
                <td className="px-6 py-4 text-sm">{order.items}</td>
                <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{order.date}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-primary hover:underline">View</button>
                  <button
                    className="text-primary hover:underline"
                    onClick={() => openModalForEdit(order)}
                  >
                    Edit
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

          <div className="relative bg-white dark:bg-card-dark w-full max-w-xl rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {currentOrder ? 'Edit Order' : 'New Order'}
            </h2>

            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-neutral-500">Client Name</label>
                <input
                  name="clientName"
                  type="text"
                  defaultValue={currentOrder?.client || ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Order ID</label>
                <input
                  name="orderId"
                  type="text"
                  placeholder="ORD-XXXX"
                  defaultValue={currentOrder?.id || ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Items Count</label>
                <input
                  name="items"
                  type="number"
                  min="1"
                  defaultValue={currentOrder?.items || ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Amount</label>
                <input
                  name="amount"
                  type="number"
                  placeholder="Total amount"
                  defaultValue={currentOrder ? Number(currentOrder.amount.replace(/\$|,/g, '')) : ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Status</label>
                <select
                  name="status"
                  defaultValue={currentOrder?.status || 'Pending'}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                >
                  <option>Pending</option>
                  <option>In Transit</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-neutral-500">Order Date</label>
                <input
                  name="orderDate"
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  defaultValue={currentOrder?.date || ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
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
                  {currentOrder ? 'Update Order' : 'Save Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
