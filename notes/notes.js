const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.querySelector("#note").innerHTML = `noteId: ${id}`;
