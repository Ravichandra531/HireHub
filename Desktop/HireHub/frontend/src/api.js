const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
export const API_URL = import.meta.env.VITE_API_URL || (isLocal ? "http://localhost:3002/api" : "https://hirehub-1-ddku.onrender.com/api");

export async function apiGet(endpoint, token = null) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("API Get Error:", error);
    return { ok: false, data: { error: "Unable to connect to the server" } };
  }
}

export async function apiPost(endpoint, body, token = null) {
  try {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("API Post Error:", error);
    return { ok: false, data: { error: "Unable to connect to the server" } };
  }
}

export async function apiPut(endpoint, body, token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("API Put Error:", error);
    return { ok: false, data: { error: "Unable to connect to the server" } };
  }
}

export async function apiDelete(endpoint, token) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("API Delete Error:", error);
    return { ok: false, data: { error: "Unable to connect to the server" } };
  }
}
