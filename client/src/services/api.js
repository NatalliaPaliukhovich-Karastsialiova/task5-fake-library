const API_URL = import.meta.env.VITE_API_URL;

export const getRegions = async() => {
  const res = await fetch(`${API_URL}/api/v1/regions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

export const fetchSeed = async() => {
  const res = await fetch(`${API_URL}/api/v1/seed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

export const loadBooks = async(params) => {
  const res = await fetch(`${API_URL}/api/v1/books?` + new URLSearchParams(params),
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}
