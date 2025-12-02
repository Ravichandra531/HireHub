export const API_URL = "https://hirehub-1-ddku.onrender.com/api";

export async function apiGet(endpoint, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function apiPost(endpoint, body, token = null) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function apiPut(endpoint, body, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function apiDelete(endpoint, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return { ok: res.ok, data };
}
