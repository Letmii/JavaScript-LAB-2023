document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>${note.created}</small>
            <button onclick="deleteNote(${index})">Usuń</button>
            <button onclick="editNote(${index})">Edytuj</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function addOrUpdateNote() {
    const index = document.getElementById('noteForm').getAttribute('data-editing-index');
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const color = document.getElementById('noteColor').value;
    const pin = document.getElementById('notePin').checked;
    const created = new Date().toLocaleDateString();
    
    const newNote = { title, content, color, pin, created };
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    if (index !== null) {
        notes[index] = newNote;
    } else {
        if (pin) {
            notes.unshift(newNote);
        } else {
            notes.push(newNote);
        }
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
    resetForm();
    document.getElementById('noteForm').removeAttribute('data-editing-index');
}

function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const note = notes[index];
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('noteColor').value = note.color;
    document.getElementById('notePin').checked = note.pin;
    document.getElementById('noteForm').setAttribute('data-editing-index', index);
}


function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function resetForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteColor').value = '#ffffff';
    document.getElementById('notePin').checked = false;
}
