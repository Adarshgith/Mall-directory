function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-auto"
    >
      <option value="">Sort By</option>
      <option value="az">Name: A → Z</option>
      <option value="za">Name: Z → A</option>
    </select>
  );
}

export default SortDropdown;