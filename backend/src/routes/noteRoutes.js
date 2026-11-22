const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.get('/', noteController.listNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);

module.exports = router;
