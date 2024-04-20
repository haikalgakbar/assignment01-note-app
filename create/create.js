import { API_URL } from "../src/utils";

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

  await createNewNote(title, content);

  window.location.href = "/";
});

async function createNewNote(title, content) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ title, content }]),
  });
}

notesInfo.textContent = `${new Intl.DateTimeFormat("id-ID").format(
  date
)} · 0 word`;
