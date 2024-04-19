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
    // const detail = document.createElement("a");

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
      window.location.href = `/notes/?id=${note._id}`;
    });

    notesTitle.textContent = note.title;
    notesDesc.textContent = note.content;
    notesInfo.textContent = `${new Intl.DateTimeFormat("id-ID").format(
      date
    )} · ${note.content.split(" ").length} words`;

    header.append(notesTitle);
    footer.append(notesInfo);
    section.append(header, notesDesc, footer);
    notesList.append(section);

    totalNotes.textContent = `${notes.length} Notes`;
  });
}

render();
