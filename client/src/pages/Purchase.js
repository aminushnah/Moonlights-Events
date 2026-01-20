import React from "react";

function PurchaseModule() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-primary dark:text-neutral-100 font-display antialiased min-h-screen w-full">
      {/* Main Content */}
      <main className="flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="px-8 py-6">
          <h1 className="text-3xl font-bold">Purchase Records</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Manage and track your equipment acquisition history.
          </p>
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
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="px-6 py-4 text-sm">Oct 24, 2023</td>
                  <td className="px-6 py-4 font-medium">AudioVisual Pros</td>
                  <td className="px-6 py-4">VN-10234</td>
                  <td className="px-6 py-4">Shure SM58 Mic</td>
                  <td className="px-6 py-4">Audio</td>
                  <td className="px-6 py-4 text-right">5</td>
                  <td className="px-6 py-4 text-right">$495.00</td>
                  <td className="px-6 py-4 text-right">
                    <span className="material-symbols-outlined">
                      more_vert
                    </span>
                  </td>
                </tr>
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PurchaseModule;
