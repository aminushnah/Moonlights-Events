import React, { useState } from "react";

const emptyForm = {
  date: "",
  vendor: "",
  vendorNumber: "",
  item: "",
  category: "",
  qty: "",
  total: "",
};

function PurchaseModule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const [purchases, setPurchases] = useState([
    {
      date: "2023-10-24",
      vendor: "AudioVisual Pros",
      vendorNumber: "VN-10234",
      item: "Shure SM58 Mic",
      category: "Audio",
      qty: 5,
      total: 495,
    },
  ]);

  const openNewModal = () => {
    setIsEditing(false);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (purchase, index) => {
    setIsEditing(true);
    setSelectedIndex(index);
    setFormData(purchase);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setPurchases((prev) =>
        prev.map((p, i) => (i === selectedIndex ? formData : p))
      );
    } else {
      setPurchases((prev) => [...prev, formData]);
    }

    setIsModalOpen(false);
    setFormData(emptyForm);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-primary dark:text-neutral-100 font-display antialiased min-h-screen w-full">
      <main className="flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Purchase Records</h1>
            <p className="text-neutral-500 text-sm mt-1">
              Manage and track your equipment acquisition history.
            </p>
          </div>

          <button
            onClick={openNewModal}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black/90 transition flex items-center gap-2"
          >
            <span className="material-icons-outlined">add</span>
            New Purchase
          </button>
        </header>

        {/* Table */}
        <div className="flex-1 px-8 pb-8 overflow-hidden">
          <div className="bg-white dark:bg-[#202020] rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 dark:bg-[#252525] sticky top-0">
                <tr>
                  {[
                    "Date",
                    "Vendor",
                    "Vendor Numbers",
                    "Item",
                    "Category",
                    "Qty",
                    "Total",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {purchases.map((p, i) => (
                  <tr
                    key={i}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <td className="px-6 py-4 text-sm">{p.date}</td>
                    <td className="px-6 py-4 font-medium">{p.vendor}</td>
                    <td className="px-6 py-4">{p.vendorNumber}</td>
                    <td className="px-6 py-4">{p.item}</td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4 text-right">{p.qty}</td>
                    <td className="px-6 py-4 text-right">${p.total}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3 text-sm">
                        <button
                          onClick={() => openEditModal(p, i)}
                          className="text-primary dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white dark:bg-[#202020] w-full max-w-2xl rounded-xl shadow-lg p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Purchase" : "Add Purchase"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border dark:border-neutral-700 bg-white dark:bg-[#252525]"
              />

              <input
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                placeholder="Vendor name"
                className="w-full px-3 py-2 rounded-lg border dark:border-neutral-700"
              />

              <input
                name="vendorNumber"
                value={formData.vendorNumber}
                onChange={handleChange}
                placeholder="VN-XXXXX"
                className="w-full px-3 py-2 rounded-lg border dark:border-neutral-700"
              />

              <input
                name="item"
                value={formData.item}
                onChange={handleChange}
                placeholder="Item name"
                className="w-full px-3 py-2 rounded-lg border dark:border-neutral-700"
              />

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full px-3 py-2 rounded-lg border dark:border-neutral-700"
              />

              <input
                name="qty"
                type="number"
                value={formData.qty}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full px-3 py-2 rounded-lg border dark:border-neutral-700"
              />

              <input
                name="total"
                type="number"
                value={formData.total}
                onChange={handleChange}
                placeholder="$0.00"
                className="w-full col-span-2 px-3 py-2 rounded-lg border dark:border-neutral-700"
              />

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
                  {isEditing ? "Update Purchase" : "Save Purchase"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseModule;
