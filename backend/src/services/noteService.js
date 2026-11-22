const crypto = require('crypto');
const { readNotes, writeNotes } = require('../data/noteData');

function listNotes() {
  return readNotes();
}

function getNoteById(id) {
  return readNotes().find((note) => note.id === id) || null;
}

function createNote(data) {
  const notes = readNotes();
  const now = new Date().toISOString();
  const note = {
    id: crypto.randomUUID(),
    titulo: data.titulo,
    texto: data.texto,
    personagem: data.personagem,
    criadoEm: now,
    atualizadoEm: now
  };
  notes.push(note);
  writeNotes(notes);
  return note;
}

function updateNote(id, data) {
  const notes = readNotes();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    return null;
  }

  const updated = {
    ...notes[index],
    titulo: data.titulo,
    texto: data.texto,
    personagem: data.personagem,
    atualizadoEm: new Date().toISOString()
  };
  notes[index] = updated;
  writeNotes(notes);
  return updated;
}

function deleteNote(id) {
  const notes = readNotes();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    return false;
  }
  notes.splice(index, 1);
  writeNotes(notes);
  return true;
}

module.exports = { listNotes, getNoteById, createNote, updateNote, deleteNote };
