const noteService = require('../services/noteService');
const { validateNote } = require('../validators/noteValidator');

function listNotes(req, res, next) {
  try {
    res.status(200).json(noteService.listNotes());
  } catch (error) {
    next(error);
  }
}

function getNoteById(req, res, next) {
  try {
    const note = noteService.getNoteById(req.params.id);
    if (!note) {
      res.status(404).json({ error: 'Nota nao encontrada' });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

function createNote(req, res, next) {
  const result = validateNote(req.body || {});
  if (!result.isValid) {
    res.status(400).json({ error: 'Dados invalidos', fields: result.errors });
    return;
  }

  try {
    const note = noteService.createNote(result.value);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
}

function updateNote(req, res, next) {
  const result = validateNote(req.body || {});
  if (!result.isValid) {
    res.status(400).json({ error: 'Dados invalidos', fields: result.errors });
    return;
  }

  try {
    const note = noteService.updateNote(req.params.id, result.value);
    if (!note) {
      res.status(404).json({ error: 'Nota nao encontrada' });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

function deleteNote(req, res, next) {
  try {
    const deleted = noteService.deleteNote(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Nota nao encontrada' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { listNotes, getNoteById, createNote, updateNote, deleteNote };
