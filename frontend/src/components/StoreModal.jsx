function StoreModal({ store, onClose }) {
  if (!store) return null;

  const categoryColors = {
    "Food & Beverage": "bg-orange-100 text-orange-700",
    Fashion: "bg-pink-100 text-pink-700",
    Electronics: "bg-blue-100 text-blue-700",
    Services: "bg-green-100 text-green-700",
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              categoryColors[store.category] || "bg-gray-100 text-gray-600"
            }`}
          >
            {store.category}
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Store Name */}
        <h2 className="text-2xl font-bold text-black">{store.name}</h2>

        {/* Floor */}
        <div className="flex items-center gap-2 text-gray-600">
          <span>📍</span>
          <span className="text-sm font-medium">{store.floor}</span>
        </div>

        {/* Description */}
        {store.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {store.description}
          </p>
        )}

        {/* Opening Hours */}
        {store.openingHours && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
            <span>🕐</span>
            <div>
              <p className="text-xs text-gray-400">Opening Hours</p>
              <p className="text-sm font-semibold text-gray-700">
                {store.openingHours}
              </p>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-2 w-full bg-gray-900 text-white py-2 rounded-xl font-medium hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default StoreModal;