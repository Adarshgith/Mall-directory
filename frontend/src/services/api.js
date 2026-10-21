const BASE_URL = "http://localhost:5000/api";

export const getStores = async (search = "", category = "") => {
  const query = new URLSearchParams();
  if (search) query.append("search", search);
  if (category) query.append("category", category);

  const res = await fetch(`${BASE_URL}/stores?${query}`);
  const data = await res.json();
  return data.data; // ✅ fixed
};

export const getStore = async (id) => {
  const res = await fetch(`${BASE_URL}/stores/${id}`);
  const data = await res.json();
  return data.data; // ✅ fixed
};

export const createStore = async (storeData) => {
  const res = await fetch(`${BASE_URL}/stores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storeData),
  });
  const data = await res.json();
  return data; // admin dashboard use karega success/message bhi
};

export const updateStore = async (id, storeData) => {
  const res = await fetch(`${BASE_URL}/stores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storeData),
  });
  const data = await res.json();
  return data; // admin dashboard use karega
};

export const deleteStore = async (id) => {
  const res = await fetch(`${BASE_URL}/stores/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data; // admin dashboard use karega
};