const configuredApiUrl =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, "");
export const API_BASE_URL = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

export const getStores = async (search = "", category = "") => {
  const query = new URLSearchParams();
  if (search) query.append("search", search);
  if (category) query.append("category", category);

  const res = await fetch(`${API_BASE_URL}/stores?${query}`);
  if (!res.ok) {
    throw new Error(`Failed to load stores (${res.status})`);
  }

  const data = await res.json();
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("The stores API returned an invalid response");
  }

  return data.data;
};

export const getStore = async (id) => {
  const res = await fetch(`${API_BASE_URL}/stores/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to load store (${res.status})`);
  }

  const data = await res.json();
  return data.data;
};

export const createStore = async (storeData) => {
  const res = await fetch(`${API_BASE_URL}/stores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storeData),
  });
  const data = await res.json();
  return data;
};

export const updateStore = async (id, storeData) => {
  const res = await fetch(`${API_BASE_URL}/stores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storeData),
  });
  const data = await res.json();
  return data;
};

export const deleteStore = async (id) => {
  const res = await fetch(`${API_BASE_URL}/stores/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const loginAdmin = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
};