import { API_URL, getNotes } from "../src/utils";
// import { getNotes } from "../src/utils/getNotes";

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

// console.log(cancelBtn);

// async function getNotesDetail() {
//   const res = await fetch(`${API_URL}${id}`);
//   const data = await res.json();

//   return data;
// }

async function render() {
  const notes = await getNotes(API_URL, id);
  const date = new Date(notes.createdAt);

  title.textContent = notes.title;
  info.textContent = `${new Intl.DateTimeFormat("id-ID").format(date)} · ${
    notes.content.split(" ").length
  } words`;
  content.textContent = notes.content;
  lastEdited.textContent = `last edited: ${new Date(
    notes.updatedAt
  ).toLocaleString()}`;

  console.log("create at: ", new Date(notes.createdAt));
  console.log("update at: ", new Date(notes.updatedAt));
}

editNoteBtn.addEventListener("click", () => {
  window.location.href = `/edit/?id=${id}`;
});

deleteNoteBtn.addEventListener("click", async () => {
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
