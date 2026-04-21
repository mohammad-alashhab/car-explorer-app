const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetcher(url: string) {
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}