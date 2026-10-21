function StoreCard({ store, onClick }) {
  const categoryColors = {
    "Food & Beverage": "bg-orange-100 text-orange-700",
    Fashion: "bg-pink-100 text-pink-700",
    Electronics: "bg-blue-100 text-blue-700",
    Services: "bg-green-100 text-green-700",
  };

  return (
    <div
      onClick={() => onClick(store)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-5 flex flex-col gap-3 border border-gray-200 hover:border-blue-400"
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
      <h2 className="text-lg font-bold text-gray-900">{store.name}</h2>

      {/* Floor */}
      <p className="text-sm text-gray-500">📍 {store.floor}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2">{store.description}</p>

      {/* Opening Hours */}
      {store.openingHours && (
        <p className="text-xs text-gray-400 mt-auto">🕐 {store.openingHours}</p>
      )}
    </div>
  );
}

export default StoreCard;