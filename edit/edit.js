import { API_URL } from "../src/util/const";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const noteTitle = document.querySelector("#notes-title");
const notesInfo = document.querySelector("#notes-info");
const notesContent = document.querySelector("#notes-content");
const form = document.querySelector("#notes-form");
const date = new Date();

notesContent.addEventListener("input", (e) => {
  const words = e.target.value
    .split(" ")
    .map((word) => {
      return word !== "";
    })
    .reduce((prev, curr) => prev + curr, 0);

  notesInfo.textContent = `${new Intl.DateTimeFormat("id-ID").format(date)} · ${
    words < 2 ? words + " word" : words + " words"
  }`;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const title = data.get("notes-title");
  const content = data.get("notes-content");

  await updateNote(id, title, content);

  window.location.href = `/notes/?id=${id}`;
});

async function getNotes() {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();

  return data;
}

async function render() {
  const note = await getNotes();
  const date = new Date(note.createdAt);
  const words = note.content
    .split(" ")
    .map((word) => {
      return word !== "";
    })
    .reduce((prev, curr) => prev + curr, 0);

  noteTitle.value = note.title;
  notesInfo.textContent = `${new Intl.DateTimeFormat("id-ID").format(date)} · ${
    words < 2 ? words + " word" : words + " words"
  }`;
  notesContent.textContent = note.content;
}

async function updateNote(id, title, content) {
  await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: id, title: title, content: content }),
  });
}

notesInfo.textContent = `${new Intl.DateTimeFormat("id-ID").format(
  date
)} · 0 word`;

render();
