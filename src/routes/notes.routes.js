const {Router} = require('express');
const router = Router();

const {renderNoteForm,createNewNote,
    renderNotes,renderEditForm,
    updateNote,deleteNote} = require('../controllers/notes.controllers.js');

const {isAuthenticated} = require('../helpers/auth'); // agregaremos este atributo a nuestras rutas que queremos proteger de usuarios no registrados


//New note
router.get('/notes/add',isAuthenticated,renderNoteForm); //isAuthenticated revisa si a iniciado sesión. Solo si lo está ingresa al metodo renderNoteForm. sino el metodo isAuthenticated le indicará que realziar y no ingresa  

router.post('/notes/newNote',isAuthenticated,createNewNote);


//Get all notes
router.get('/notes',isAuthenticated,renderNotes);

//Edit notes
router.get('/notes/edit/:id',isAuthenticated,renderEditForm);

router.put('/notes/edit/:id',isAuthenticated,updateNote);


//Delete notes
router.delete('/notes/delete/:id',isAuthenticated,deleteNote)

module.exports = router;