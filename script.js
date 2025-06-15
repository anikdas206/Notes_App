const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage on page load
function showNotes() {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notesContainer.innerHTML = savedNotes;
  }
  bindKeyupEvents(); // bind keyup to existing notes after loading
}

showNotes();

// Save notes HTML to localStorage
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Bind onkeyup event to all editable notes for auto-save
function bindKeyupEvents() {
  const notes = document.querySelectorAll(".input-box");
  notes.forEach((note) => {
    note.onkeyup = updateStorage;
  });
}

// Create a new editable note with delete icon
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");

  img.src = "./images/delete.png";
  img.alt = "Delete note"; // accessibility

  // Append delete icon inside the note
  inputBox.appendChild(img);

  // Append the note to container
  notesContainer.appendChild(inputBox);

  bindKeyupEvents(); // bind keyup to new note

  updateStorage(); // save after creating new note
});

// Event delegation for delete and focusing on notes
notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    // Delete note on clicking delete icon
    e.target.parentElement.remove();
    updateStorage();
  }
});

// Handle Enter key inside editable notes only
notesContainer.addEventListener("keydown", (event) => {
  if (event.target.classList.contains("input-box") && event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
