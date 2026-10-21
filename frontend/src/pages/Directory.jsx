import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import StoreCard from "../components/StoreCard";
import StoreModal from "../components/StoreModal";
import { getStores } from "../services/api";

function Directory() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getStores(search, category);
        setStores(data);
      } catch (err) {
        setError("Failed to load stores. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search — 400ms wait after typing
    const timer = setTimeout(fetchStores, 400);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Store Directory</h1>
        <p className="text-sm text-gray-500">Browse all stores in the mall</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="w-full sm:max-w-sm">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20 text-gray-400 text-sm">
          <span className="animate-pulse text-lg">⏳ Loading stores...</span>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center py-20 gap-2">
          <span className="text-3xl">⚠️</span>
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => setSearch("") || setCategory("")}
            className="text-sm text-blue-500 hover:underline mt-1"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && stores.length === 0 && (
        <div className="flex flex-col items-center py-20 gap-3 text-center">
          <span className="text-5xl">🏪</span>
          <p className="text-gray-600 font-medium text-lg">No stores found</p>
          <p className="text-gray-400 text-sm">
            Try a different search term or category
          </p>
          <button
            onClick={() => { setSearch(""); setCategory(""); }}
            className="mt-2 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Store Grid */}
      {!loading && !error && stores.length > 0 && (
        <>
          <p className="text-sm text-gray-400 mb-4">
            {stores.length} store{stores.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {stores.map((store) => (
              <StoreCard
                key={store._id}
                store={store}
                onClick={setSelectedStore}
              />
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      <StoreModal
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
}

export default Directory;