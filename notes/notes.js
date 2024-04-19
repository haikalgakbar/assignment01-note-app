import { API_URL } from "../src/util/const";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const title = document.querySelector("#notes-title");
const info = document.querySelector("#notes-info");
const content = document.querySelector("#notes-content");
const lastEdited = document.querySelector("#last-edited");
const editNoteBtn = document.querySelector("#edit-note");
const deleteNoteBtn = document.querySelector("#delete-note");

async function getNotesDetail() {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();

  return data;
}

async function render() {
  const notes = await getNotesDetail();
  const date = new Date(notes.createdAt);

  title.textContent = notes.title;
  info.textContent = `${new Intl.DateTimeFormat("id-ID").format(date)} · ${
    notes.content.split(" ").length
  } words`;
  content.textContent = notes.content;
  lastEdited.textContent = `last edited: ${new Date(
    notes.updatedAt
  ).toLocaleString()}`;
}

editNoteBtn.addEventListener("click", () => {
  window.location.href = `/edit/?id=${id}`;
});

render();
