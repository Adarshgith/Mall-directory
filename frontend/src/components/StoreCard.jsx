function StoreCard({ store, onClick }) {
  const categoryColors = {
    "Food & Beverage": "bg-orange-100 text-orange-700",
    Fashion: "bg-pink-100 text-pink-700",
    Electronics: "bg-blue-100 text-blue-700",
    Services: "bg-green-100 text-green-700",
  };

  return (
    <button
      type="button"
      onClick={() => onClick(store)}
      className="flex min-h-64 w-full min-w-0 cursor-pointer flex-col items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-md transition-shadow duration-300 hover:border-blue-400 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      {/* Category Badge */}
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${
          categoryColors[store.category] || "bg-gray-100 text-gray-600"
        }`}
      >
        {store.category}
      </span>

      {/* Store Name */}
      <h2 className="w-full break-words text-lg font-bold text-gray-900">
        {store.name}
      </h2>

      {/* Floor */}
      <p className="text-sm text-gray-500">📍 {store.floor}</p>

      {/* Description */}
      <p className="line-clamp-3 w-full break-words text-sm text-gray-600">
        {store.description}
      </p>

      {/* Opening Hours */}
      {store.openingHours && (
        <p className="mt-auto w-full break-words text-xs text-gray-500">
          🕐 {store.openingHours}
        </p>
      )}
    </button>
  );
}

export default StoreCard;