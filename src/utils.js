export const API_URL = "https://v1.appbackend.io/v1/rows/udWTIFlqXlNk/";

export async function getNotes(API, Id = 0) {
  const url = Id === 0 ? API : `${API}${Id}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}
