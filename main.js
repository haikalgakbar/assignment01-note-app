import { API_URL } from "./src/util/const";
const notesList = document.querySelector("main");
const totalNotes = document.querySelector("#total-notes");

async function getNotes() {
  const res = await fetch(API_URL);
  const { data } = await res.json();

  return data;
}

async function render() {
  const notes = await getNotes();

  notes.forEach((note) => {
    const date = new Date(note.createdAt);
    const section = document.createElement("section");
    const header = document.createElement("header");
    const notesTitle = document.createElement("h2");
    const notesDesc = document.createElement("p");
    const notesInfo = document.createElement("p");
    const footer = document.createElement("footer");
    const detail = document.createElement("a");

    section.classList.add(
      "bg-[#292929]",
      "p-4",
      "rounded-xl",
      "gap-2",
      "hover:bg-[#3D3D3D]",
      "cursor-pointer"
    );
    notesTitle.classList.add("font-semibold");
    notesInfo.classList.add("text-[#616161]");
    detail.classList.add("text-[#616161]", "underline");
    notesDesc.classList.add("line-clamp-2");
    detail.href = `/notes/?id=${note._id}`;

    section.addEventListener("click", () => {
      window.location.href = `/notes/?id=${note._id}`;
    });

    notesTitle.textContent = note.title;
    notesDesc.textContent = note.content;
    notesInfo.textContent = `${new Intl.DateTimeFormat("id-ID").format(
      date
    )} · ${note.content.split(" ").length} words`;
    detail.textContent = "See detail";

    header.append(notesTitle, notesInfo);
    footer.append(detail);
    section.append(header, notesDesc, footer);
    notesList.append(section);

    totalNotes.textContent = `${notes.length} Notes`;
  });
}

render();
