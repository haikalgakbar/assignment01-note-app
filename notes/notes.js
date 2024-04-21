import { API_URL, formatDate, getNotes, wordOrWords } from "../src/utils";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const title = document.querySelector("#notes-title");
const info = document.querySelector("#notes-info");
const content = document.querySelector("#notes-content");
const lastEdited = document.querySelector("#last-edited");
const editNoteBtn = document.querySelector("#edit-note");
const deleteNoteBtn = document.querySelector("#delete-note");
const dialog = document.querySelector("dialog");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = dialog.querySelector("#cancel-btn");

async function render() {
  const notes = await getNotes(API_URL, id);
  const date = new Date(notes.created_at);

  title.textContent = notes.title;
  info.textContent = `${formatDate(date)} · ${wordOrWords(
    notes.content.split(" ").length
  )}`;
  content.textContent = notes.content;
  lastEdited.textContent = `last edited: ${new Date(
    notes.updated_at
  ).toLocaleString()}`;
}

editNoteBtn.addEventListener("click", () => {
  window.location.href = `/edit/?id=${id}`;
});

deleteNoteBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

confirmBtn.addEventListener("click", () => {
  fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });

  location.replace("/");
});

render();
