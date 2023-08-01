import { NoteService } from './NoteService.js'
import { DOMHelper, popups } from './DOMHelper.js';
import configureWindowEvents from './configureWindowEvents.js';

const noteService = new NoteService();
const domHelper = new DOMHelper();

window.localStorage.setItem('interactionNoteId', '');
window.localStorage.setItem('removeNoteId', '');
window.localStorage.setItem('archiveNoteId', '');
window.localStorage.setItem('editNoteId', '');

noteService.notes.forEach(note => {
    domHelper.addNote(note);
})
configureWindowEvents(noteService, domHelper);


domHelper.updateNoteStatistics(noteService.notes, noteService.archivedNotes);

console.log(noteService.notes);