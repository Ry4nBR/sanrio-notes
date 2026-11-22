const noteService = require('../services/noteService');

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

module.exports = { listNotes, getNoteById };
