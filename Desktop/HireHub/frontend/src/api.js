const API_URL = "https://hirehub-1-ddku.onrender.com/api"; // correct

export async function apiPost(endpoint, body) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data;
  try {
    data = await res.json();
  } catch (err) {
    // fallback for non-JSON response
    data = await res.text();
  }

  return { ok: res.ok, data };
}

export async function apiGet(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let data;
  try {
    data = await res.json();
  } catch (err) {
    data = await res.text();
  }

  return { ok: res.ok, data };
}

