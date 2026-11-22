const noteService = require('../services/noteService');

function listNotes(req, res, next) {
  try {
    res.status(200).json(noteService.listNotes());
  } catch (error) {
    next(error);
  }
}

module.exports = { listNotes };
