const addNoteButton = document.getElementById('addNoteButton');
const noteList = document.getElementById('noteList');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveButton = document.getElementById('saveButton');
const deleteButton = document.getElementById('deleteButton');
const noteWrapper = document.querySelector('main');

const myNotes = JSON.parse(localStorage.getItem('notes')) ?? {};

for (const id in myNotes) {
  renderNoteList(myNotes[id]);
}

function renderNoteList(note) {
  const li = document.createElement('li');
  li.innerText = note.title;
  li.setAttribute('data-note-id', note.id);
  noteList.appendChild(li);
}

addNoteButton.addEventListener('click', () => {
  console.log('Button clicked!');

  const note = new Note();
  const li = document.createElement('li');
  li.innerText = note.title;
  noteContent.innerText = note.content;
  li.setAttribute('data-note-id', note.id);
  noteList.appendChild(li);

  noteWrapper.setAttribute('data-note-id', note.id);

  noteTitle.innerText = note.title;

  myNotes[note.id] = note;

  localStorage.setItem('notes', JSON.stringify(myNotes));
});

saveButton.addEventListener('click', saveNote);

deleteButton.addEventListener('click', () => {
  const noteId = noteWrapper.getAttribute('data-note-id');
  const note = new Note();
  note.Delete();
  delete myNotes[noteId];
  localStorage.setItem('notes', JSON.stringify(myNotes));
  noteTitle.textContent = '';
  noteContent.textContent = '';
  noteWrapper.removeAttribute('data-note-id');

  // Find the li element with the matching data-note-id and remove it
  const li = document.querySelector(`li[data-note-id="${noteId}"]`);
  if (li) {
    li.remove();
  }
});

function saveNote() {
  const noteId = noteWrapper.getAttribute('data-note-id');
  const note = new Note(myNotes[noteId]);
  note.title = noteTitle.textContent;
  note.content = noteContent.innerText;
  note.Save();
  console.log(note);

  // update the list item
  const li = document.querySelector(`li[data-note-id="${noteId}"]`);
  li.innerText = note.title;
  localStorage.setItem('notes', JSON.stringify(myNotes));
}

// add event listener to li items;

noteList.addEventListener('click', viewNote);

function viewNote(e) {
  const id = e.target.getAttribute('data-note-id');
  const note = new Note(myNotes[id]);
  noteWrapper.setAttribute('data-note-id', note.id);
  noteTitle.textContent = note.title;
  noteContent.innerText = note.content;
}

class Note {
  constructor(data = {}) {
    (this.id = data.id ?? this.#GenerateID()),
      (this.title = data.title ?? 'Untitled'),
      (this.content = data.content ?? ''),
      (this.createdAt = data.createdAt ?? this.#GetDate()),
      (this.updatedAt = data.updatedAt ?? null);
  }

  #GenerateID() {
    return Math.random().toString(36).substring(2, 10);
  }

  #GetDate() {
    return new Date().toLocaleString();
  }

  Save() {
    console.log('Note saved!');
    myNotes[this.id] = this;
  }

  Delete() {
    console.log('Note Deleted!');
  }
}
