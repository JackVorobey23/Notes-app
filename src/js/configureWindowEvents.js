import { DOMHelper, popups } from "./DOMHelper.js";
import DateHelper from "./DateHelper.js";
import { NoteService } from "./NoteService.js";

/**
 * @param {NoteService} noteService 
 * @param {DOMHelper} domHelper
 */

export default function configureWindowEvents(noteService, domHelper) {

    window.setRemoveNote = (htmlElement) => {

        window.localStorage.setItem('removeNoteId', htmlElement.parentElement.id);

        domHelper.showPopup(popups.popupRemove);
    }

    window.setArchiveNote = (htmlElement) => {

        window.localStorage.setItem('archiveNoteId', htmlElement.parentElement.id);

        domHelper.showPopup(popups.popupArchive);
    }

    window.setEditNote = (htmlElement) => {

        const noteToEdit = noteService.getNoteById(htmlElement.parentElement.id);
        window.localStorage.setItem('editNoteId', noteToEdit.id);

        domHelper.fillEditNoteInfo(noteToEdit);
        domHelper.showPopup(popups.popupEdit);
    }

    window.openCreatePopup = () => {

        domHelper.showPopup(popups.popupCreate);
    }

    window.unarchive = (trElement) => {

        const unarchiveNoteId = trElement.parentElement.id;

        noteService.unarchiveNote(unarchiveNoteId);

        domHelper.removeArchivedNoteElementById(unarchiveNoteId);

        domHelper.updateNoteStatistics(noteService);
        domHelper.addNote(noteService.getNoteById(unarchiveNoteId));
    }

    window.closePopups = () => {
        Object.values(popups).forEach(popup => {
            domHelper.closePopup(popup);
        });
    }

    window.removeNote = () => {

        const noteIdToRemove = window.localStorage.getItem('removeNoteId');

        const removeResult = noteService.removeNote(noteIdToRemove);

        domHelper.closePopup(popups.popupRemove);

        if (!removeResult.success) {
            console.log(removeResult.errorMsg);
        }
        else {
            domHelper.removeNoteElementById(noteIdToRemove);
            window.localStorage.setItem('removeNoteId', '')
        }
    }

    window.archiveNote = () => {

        const noteIdToArchive = window.localStorage.getItem('archiveNoteId');

        const archiveResult = noteService.archiveNote(noteIdToArchive);

        domHelper.closePopup(popups.popupArchive);

        if (archiveResult.success) {

            domHelper.removeNoteElementById(noteIdToArchive);

            window.localStorage.setItem('archiveNoteId', '');
            domHelper.updateNoteStatistics(noteService)
        }
        else {
            console.log(archiveResult.errorMsg);
        }
    }

    window.updateNote = () => {

        const newNote = domHelper.getEditNoteInfo();
        const updateResult = noteService.updateNote(newNote);

        if (!updateResult.success) {
            console.log(updateResult.errorMsg);
            return;
        }
        window.localStorage.setItem('editNoteId', '');

        domHelper.updateNote(noteService.getNoteById(newNote.id));

        domHelper.closePopup(popups.popupEdit);

        domHelper.updateNoteStatistics(noteService);
    }

    window.createNote = () => {

        const newNote = domHelper.getCreateNodeInfo();

        newNote.created = DateHelper.formatCreatedDate(new Date(Date.now()));
        newNote.id = crypto.randomUUID();

        noteService.addNote(newNote);

        domHelper.addNote(newNote);

        domHelper.closePopup(popups.popupCreate);
        domHelper.updateNoteStatistics(noteService);
    }

    window.removeAll = () => {

        noteService.notes.forEach(note => {

            noteService.removeNote(note.id);
            
            domHelper.removeNoteElementById(note.id);
        });

        domHelper.updateNoteStatistics(noteService);

    }

    window.archiveAll = () => {
        
        noteService.notes.forEach(note => {

            noteService.archiveNote(note.id);
            
            domHelper.removeNoteElementById(note.id);
        });

        domHelper.updateNoteStatistics(noteService);
    }
}