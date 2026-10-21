function SummaryCards({ stores }) {
  const totalStores = stores.length;

  const totalCategories = new Set(stores.map((s) => s.category)).size;

  const topCategory =
    Object.entries(
      stores.reduce((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-1 border-l-4 border-blue-500">
        <p className="text-sm text-gray-500">Total Stores</p>
        <p className="text-3xl font-bold text-gray-900">{totalStores}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-1 border-l-4 border-purple-500">
        <p className="text-sm text-gray-500">Total Categories</p>
        <p className="text-3xl font-bold text-gray-900">{totalCategories}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-1 border-l-4 border-green-500">
        <p className="text-sm text-gray-500">Most Stores In</p>
        <p className="text-2xl font-bold text-gray-900">{topCategory}</p>
      </div>
    </div>
  );
}

export default SummaryCards;