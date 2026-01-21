import React, { useState } from 'react';

function Quotations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quotes, setQuotes] = useState([
    { id: 'QT-001', client: 'Corporate Event Inc.', value: '$5,200', status: 'Pending', daysLeft: 3 },
    { id: 'QT-002', client: 'Wedding Planners Co.', value: '$8,500', status: 'Accepted', daysLeft: 0 },
    { id: 'QT-003', client: 'Conference Organizers', value: '$3,800', status: 'Pending', daysLeft: 5 },
    { id: 'QT-004', client: 'Party Rentals Ltd.', value: '$2,100', status: 'Rejected', daysLeft: -2 },
    { id: 'QT-005', client: 'Grand Celebrations', value: '$12,400', status: 'Pending', daysLeft: 7 },
  ]);

  const [currentQuote, setCurrentQuote] = useState(null); // null = new quote, object = edit quote

  const filteredQuotations = quotes.filter(q =>
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

  const openModalForNew = () => {
    setCurrentQuote(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (quote) => {
    setCurrentQuote(quote);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedQuote = {
      id: form.quoteId.value,
      client: form.clientName.value,
      value: `$${Number(form.value.value).toLocaleString()}`,
      status: form.status.value,
      daysLeft: Math.ceil((new Date(form.validUntil.value) - new Date()) / (1000 * 60 * 60 * 24))
    };

    if (currentQuote) {
      // Edit existing quote
      setQuotes(quotes.map(q => q.id === currentQuote.id ? updatedQuote : q));
    } else {
      // Add new quote
      setQuotes([...quotes, updatedQuote]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quotations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage and track quotations
          </p>
        </div>
        <button
          onClick={openModalForNew}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black/90 transition flex items-center gap-2"
        >
          <span className="material-icons-outlined">add</span>
          New Quote
        </button>
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

      {/* Table */}
      <div className="bg-white dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-neutral-800 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Quote ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Value</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Days Left</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {filteredQuotations.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                <td className="px-6 py-4 text-sm font-medium">{quote.id}</td>
                <td className="px-6 py-4 text-sm">{quote.client}</td>
                <td className="px-6 py-4 text-sm font-semibold">{quote.value}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {quote.daysLeft > 0 ? `${quote.daysLeft} days` : 'Expired'}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-primary hover:underline">View</button>
                  <button
                    className="text-primary hover:underline"
                    onClick={() => openModalForEdit(quote)}
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
              {currentQuote ? 'Edit Quotation' : 'New Quotation'}
            </h2>

            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-neutral-500">Client Name</label>
                <input
                  name="clientName"
                  type="text"
                  defaultValue={currentQuote?.client || ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Quote ID</label>
                <input
                  name="quoteId"
                  type="text"
                  placeholder="QT-XXX"
                  defaultValue={currentQuote?.id || ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Value</label>
                <input
                  name="value"
                  type="number"
                  placeholder="Amount"
                  defaultValue={currentQuote ? Number(currentQuote.value.replace(/\$|,/g, '')) : ''}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-neutral-500">Status</label>
                <select
                  name="status"
                  defaultValue={currentQuote?.status || 'Pending'}
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                >
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-sm text-neutral-500">Valid Until</label>
                <input
                  name="validUntil"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  defaultValue={
                    currentQuote
                      ? new Date(Date.now() + currentQuote.daysLeft * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  className="w-full mt-1 px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  required
                />
              </div>

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
                  {currentQuote ? 'Update Quote' : 'Save Quote'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quotations;
