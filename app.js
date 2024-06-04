const addNoteButton = document.getElementById('addNoteButton');
const noteList = document.getElementById('noteList');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveButton = document.getElementById('saveButton');
const noteWrapper = document.querySelector('main');

const myNotes = {};

addNoteButton.addEventListener('click', () => {
  console.log('Button clicked!');

  const note = new Note();
  const li = document.createElement('li');
  li.innerText = note.title;
  noteList.appendChild(li);

  noteWrapper.setAttribute('data-note-id', note.id);

  noteTitle.innerText = note.title;

  myNotes[note.id] = note;
});

saveButton.addEventListener('click', UpdateNote);

function UpdateNote() {
  const noteId = noteWrapper.getAttribute('data-note-id');
  const note = new Note(myNotes[noteId]);
  note.title = noteTitle.textContent;
  note.content = noteContent.innerText;
  note.Save();
  console.log(note);
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
