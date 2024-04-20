import {
  API_URL,
  formatDate,
  getNotes,
  getStorage,
  setStorage,
  wordOrWords,
} from "./src/utils";

const notesList = document.querySelector("main");
const totalNotes = document.querySelector("#total-notes");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
const display = document.querySelector("#display");
let _notes = [];

getStorage("notes") ?? setStorage("notes", { sort: "asc", display: "row" });

const { sort: _sort, display: _display } = getStorage("notes");

_sort === "asc"
  ? (sort.innerHTML = `<i class="ph ph-sort-ascending text-2xl"></i>`)
  : (sort.innerHTML = `<i class="ph ph-sort-descending text-2xl"></i>`);

_display === "row"
  ? (display.innerHTML = `<i class="ph ph-list text-2xl"></i>`)
  : (display.innerHTML = `<i class="ph ph-squares-four text-2xl"></i>`);

async function render() {
  const { data: notes } = await getNotes(API_URL);
  _notes = notes;

  const filteredNotes = _notes.sort((a, b) =>
    _sort === "asc" ? a.created_at - b.created_at : b.created_at - a.created_at
  );

  filteredNotes.forEach((note) => {
    const date = new Date(note.created_at);

    notesList.append(NotesCard(note._id, note.title, note.content, date));
  });
  totalNotes.textContent = `${_notes.length} Notes`;
}

search.addEventListener("input", (e) => {
  const input = e.target.value;
  notesList.innerHTML = "";

  const filteredNotes = _notes.filter((note) => {
    return note.title.toLowerCase().includes(input.toLowerCase());
  });

  filteredNotes.forEach((note) => {
    const date = new Date(note.created_at);
    notesList.append(NotesCard(note._id, note.title, note.content, date));
  });

  if (input === "") render();
});

sort.addEventListener("click", () => {
  if (_sort === "asc") {
    setStorage("notes", { sort: "desc", display: _display });
    sort.innerHTML = `<i class="ph ph-sort-descending text-2xl"></i>`;
  } else {
    setStorage("notes", { sort: "asc", display: _display });
    sort.innerHTML = `<i class="ph ph-sort-ascending text-2xl"></i>`;
  }

  location.reload();
});

display.addEventListener("click", () => {
  _display === "row"
    ? setStorage("notes", { sort: _sort, display: "column" })
    : setStorage("notes", { sort: _sort, display: "row" });

  location.reload();
});

render();

function NotesCard(id, title, content, date) {
  const section = document.createElement("section");
  const header = document.createElement("header");
  const notesTitle = document.createElement("h2");
  const notesDesc = document.createElement("p");
  const notesInfo = document.createElement("p");
  const footer = document.createElement("footer");

  section.classList.add(
    "flex",
    "flex-col",
    "bg-[#292929]",
    "p-4",
    "rounded-xl",
    "gap-1",
    "hover:bg-[#3D3D3D]",
    "cursor-pointer"
  );
  notesTitle.classList.add("font-semibold", "text-lg");
  notesInfo.classList.add("text-[#616161]", "text-sm");
  notesDesc.classList.add("line-clamp-2");

  section.addEventListener("click", () => {
    window.location.href = `/notes/?id=${id}`;
  });

  notesTitle.textContent = title;
  notesDesc.textContent = content;
  notesInfo.textContent = `${formatDate(date)} · ${wordOrWords(
    content.split(" ").length
  )}`;

  header.append(notesTitle);
  footer.append(notesInfo);
  section.append(header, notesDesc, footer);

  return section;
}
