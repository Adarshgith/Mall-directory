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
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
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