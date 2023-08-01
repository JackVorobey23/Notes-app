import { DOMHelper, popups } from "./DOMHelper.js";


export default function configureWindowEvents(noteService, domHelper) {
        
    window.setRemoveNote = (htmlElement) => {

        window.localStorage.setItem('removeNoteId', htmlElement.parentElement.id);

        domHelper.showPopup(popups.popupRemove);
    }

    window.setArchiveNote = (htmlElement) => {

        window.localStorage.setItem('archiveNoteId', htmlElement.parentElement.id);

        domHelper.showPopup(popups.popupArchive);
    }

    window.openCreatePopup = () => {

        domHelper.showPopup(popups.popupCreate);
    }

    window.closePopups = () => {
        Object.values(popups).forEach(popup => {
            domHelper.hidePopup(popup);
        });
    }

    window.removeNote = () => {

        const noteIdToRemove = window.localStorage.getItem('removeNoteId');

        const removeResult = noteService.removeNote(noteIdToRemove);
        
        domHelper.hidePopup(popups.popupRemove);
        
        if (!removeResult.success) {
            console.log(removeResult.error);
        }
        else {
            domHelper.removeNoteElementById(noteIdToRemove);
            window.localStorage.setItem('removeNoteId', '')
        }
    }

    window.archiveNote = () => {

        const noteIdToArchive = window.localStorage.getItem('archiveNoteId');

        const archiveResult = noteService.archiveNote(noteIdToArchive);

        domHelper.hidePopup(popups.popupArchive);

        if (archiveResult.success) {

            domHelper.removeNoteElementById(noteIdToArchive);

            window.localStorage.setItem('archiveNoteId', '');
            domHelper.updateNoteStatistics(noteService.notes, noteService.archivedNotes)
        }
        else {
            console.log(archiveResult.error);
        }
    }

    window.createNote = () => {
        
        const noteName = document.getElementById('create-note-name').value;

        const noteCategory = document.getElementById('create-note-category').value;

        const content = document.getElementById('create-note-content').value;

        const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;

        const dates = content
            .match(dateRegex)
            ?.filter(stringDate => {
                console.log(stringDate);
                const date = new Date(stringDate);
                console.log(date);

                return (date > new Date('01.01.1800') && date < new Date('01.01.2200'));
            });

        const newNote = {
            name: noteName,
            created: noteService.formatCreatedDate(new Date(Date.now())),
            category: noteCategory,
            content: content,
            dates: dates ? dates : '',
            id: crypto.randomUUID()
        }
        domHelper.addNote(newNote);
        noteService.addNote(newNote);
        
        domHelper.hidePopup(popups.popupCreate);
        domHelper.updateNoteStatistics(noteService.notes, noteService.archivedNotes);
    }
}