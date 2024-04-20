export const API_URL = "https://v1.appbackend.io/v1/rows/udWTIFlqXlNk/";

export async function getNotes(API, Id = -1) {
  const url = Id === -1 ? API : `${API}${Id}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export function wordOrWords(word) {
  return word < 2 ? word + " word" : word + " words";
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("id-ID").format(date);
}

export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}