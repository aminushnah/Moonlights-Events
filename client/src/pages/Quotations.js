import React, { useState } from 'react';

function Quotations() {
  const [searchTerm, setSearchTerm] = useState('');

  const quotations = [
    { id: 'QT-001', client: 'Corporate Event Inc.', value: '$5,200', status: 'Pending', daysLeft: 3 },
    { id: 'QT-002', client: 'Wedding Planners Co.', value: '$8,500', status: 'Accepted', daysLeft: 0 },
    { id: 'QT-003', client: 'Conference Organizers', value: '$3,800', status: 'Pending', daysLeft: 5 },
    { id: 'QT-004', client: 'Party Rentals Ltd.', value: '$2,100', status: 'Rejected', daysLeft: -2 },
    { id: 'QT-005', client: 'Grand Celebrations', value: '$12,400', status: 'Pending', daysLeft: 7 },
  ];

  const filteredQuotations = quotations.filter(q =>
    q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200';
      case 'Rejected':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quotations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track quotations</p>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black/90 transition flex items-center gap-2">
          <span className="material-icons-outlined">add</span>
          New Quote
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
          <p className="text-secondary text-sm">Total Quotations</p>
          <p className="text-2xl font-bold text-primary dark:text-white">245</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
          <p className="text-secondary text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">18</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
          <p className="text-secondary text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-600">156</p>
        </div>
        <div className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
          <p className="text-secondary text-sm">Total Value</p>
          <p className="text-2xl font-bold text-primary dark:text-white">$486,200</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-card-dark p-4 rounded-lg border border-border-light dark:border-border-dark mb-6">
        <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-lg px-4 py-2">
          <span className="material-icons-outlined text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 bg-transparent border-none focus:ring-0 w-full outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white dark:bg-card-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-neutral-800 border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Quote ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Value</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Days Left</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {filteredQuotations.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                <td className="px-6 py-4 text-sm font-medium">{quote.id}</td>
                <td className="px-6 py-4 text-sm">{quote.client}</td>
                <td className="px-6 py-4 text-sm font-semibold">{quote.value}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{quote.daysLeft > 0 ? `${quote.daysLeft} days` : 'Expired'}</td>
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

export default Quotations;
