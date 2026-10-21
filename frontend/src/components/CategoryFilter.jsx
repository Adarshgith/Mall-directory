const categories = [
  "All",
  "Food & Beverage",
  "Fashion",
  "Electronics",
  "Services",
];

function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === "All" ? "" : cat)}
          aria-pressed={selected === (cat === "All" ? "" : cat)}
          className={`min-h-10 rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-200
            ${
              selected === (cat === "All" ? "" : cat)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-black border-gray-300 hover:border-blue-400 hover:text-blue-500"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;