import { getToken } from "./authenticate";

export async function addToFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: "PUT",
    headers: { Authorization: `JWT ${getToken()}` }
  });
  return res.ok ? await res.json() : [];
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: "DELETE",
    headers: { Authorization: `JWT ${getToken()}` }
  });
  return res.ok ? await res.json() : [];
}

export async function getFavourites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    headers: { Authorization: `JWT ${getToken()}` }
  });
  return res.ok ? await res.json() : [];
}

export async function addToHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
    headers: { Authorization: `JWT ${getToken()}` }
  });
  return res.ok ? await res.json() : [];
}

export async function removeFromHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
    headers: { Authorization: `JWT ${getToken()}` }
  });
  return res.ok ? await res.json() : [];
}

export async function getHistory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    headers: { Authorization: `JWT ${getToken()}` }
  });
  return res.ok ? await res.json() : [];
}
