import { API_URL, formatDate, getNotes, wordOrWords } from "../src/utils";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const noteTitle = document.querySelector("#notes-title");
const notesInfo = document.querySelector("#notes-info");
const notesContent = document.querySelector("#notes-content");
const form = document.querySelector("#notes-form");
let _notes = [];

notesContent.addEventListener("input", (e) => {
  const words = e.target.value
    .split(" ")
    .map((word) => word !== "")
    .reduce((prev, curr) => prev + curr, 0);

  notesInfo.textContent = `${formatDate(_notes.created_at)} · ${wordOrWords(
    words
  )}`;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const title = data.get("notes-title");
  const content = data.get("notes-content");

  await updateNote(id, title, content);

  window.location.href = `/notes/?id=${id}`;
});

async function render() {
  const notes = await getNotes(API_URL, id);
  _notes = notes;

  const date = new Date(_notes.createdAt);
  const words = _notes.content
    .split(" ")
    .map((word) => word !== "")
    .reduce((prev, curr) => prev + curr, 0);

  noteTitle.value = _notes.title;
  notesInfo.textContent = `${formatDate(date)} · ${wordOrWords(words)}`;
  notesContent.textContent = _notes.content;
}

async function updateNote(id, title, content) {
  await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
      title: title,
      content: content,
      updated_at: new Date().getTime(),
    }),
  });
}

render();
