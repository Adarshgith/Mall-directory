function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full min-w-0">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search stores..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-base"
      />
    </div>
  );
}

export default SearchBar;