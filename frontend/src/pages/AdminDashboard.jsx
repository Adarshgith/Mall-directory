import { useState, useEffect } from "react";
import { getStores, createStore, updateStore, deleteStore } from "../services/api";
import SummaryCards from "../components/SummaryCards";

const CATEGORIES = ["Food & Beverage", "Fashion", "Electronics", "Services"];

const emptyForm = {
  name: "",
  category: "",
  floor: "",
  description: "",
  openingHours: "",
};

function StoreForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial || emptyForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Store name is required";
    if (!form.category) e.category = "Category is required";
    if (!form.floor.trim()) e.floor = "Floor/Location is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) return setErrors(e2);
    onSubmit(form);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900">
          {initial ? "Edit Store" : "Add New Store"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Store Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Bean & Brew"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Floor */}
          <div>
            <label className="text-sm font-medium text-gray-700">Floor / Location *</label>
            <input
              name="floor"
              value={form.floor}
              onChange={handleChange}
              placeholder="e.g. Level 1"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.floor && <p className="text-red-500 text-xs mt-1">{errors.floor}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description..."
              rows={2}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Opening Hours */}
          <div>
            <label className="text-sm font-medium text-gray-700">Opening Hours</label>
            <input
              name="openingHours"
              value={form.openingHours}
              onChange={handleChange}
              placeholder="e.g. 10:00 AM – 10:00 PM"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : initial ? "Update Store" : "Add Store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editStore, setEditStore] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null); // { type: "success"|"error", msg }

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStores = async () => {
    setLoading(true);
    try {
      const data = await getStores();
      setStores(data);
    } catch {
      showToast("error", "Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleAdd = async (form) => {
    setFormLoading(true);
    try {
      const res = await createStore(form);
      if (res.success) {
        showToast("success", "Store added successfully!");
        setShowForm(false);
        fetchStores();
      } else {
        showToast("error", res.message || "Failed to add store");
      }
    } catch {
      showToast("error", "Something went wrong");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (form) => {
    setFormLoading(true);
    try {
      const res = await updateStore(editStore._id, form);
      if (res.success) {
        showToast("success", "Store updated successfully!");
        setEditStore(null);
        fetchStores();
      } else {
        showToast("error", res.message || "Failed to update store");
      }
    } catch {
      showToast("error", "Something went wrong");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteStore(deleteId);
      if (res.success) {
        showToast("success", "Store deleted successfully!");
        setDeleteId(null);
        fetchStores();
      } else {
        showToast("error", res.message || "Failed to delete store");
      }
    } catch {
      showToast("error", "Something went wrong");
    }
  };

  const categoryColors = {
    "Food & Beverage": "bg-orange-100 text-orange-700",
    Fashion: "bg-pink-100 text-pink-700",
    Electronics: "bg-blue-100 text-blue-700",
    Services: "bg-green-100 text-green-700",
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all
            ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.type === "success" ? "✅" : "❌"} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">
            {stores.length} store{stores.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          + Add Store
        </button>
      </div>

      {!loading && <SummaryCards stores={stores} />}

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">
          ⏳ Loading stores...
        </div>
      ) : stores.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No stores yet. Click "Add Store" to get started.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Store Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Category</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Floor</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Opening Hours</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stores.map((store) => (
                  <tr key={store._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-900">{store.name}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[store.category] || "bg-gray-100 text-gray-600"}`}>
                        {store.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">📍 {store.floor}</td>
                    <td className="px-5 py-4 text-gray-500 hidden md:table-cell">
                      {store.openingHours || "—"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditStore(store)}
                          className="px-3 py-1.5 text-xs font-medium border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(store._id)}
                          className="px-3 py-1.5 text-xs font-medium border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Form Modal */}
      {showForm && (
        <StoreForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
          loading={formLoading}
        />
      )}

      {/* Edit Form Modal */}
      {editStore && (
        <StoreForm
          initial={editStore}
          onSubmit={handleEdit}
          onCancel={() => setEditStore(null)}
          loading={formLoading}
        />
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900">Delete Store?</h3>
            <p className="text-sm text-gray-500">
              Yeh action undo nahi ho sakta. Store permanently delete ho jaayega.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;