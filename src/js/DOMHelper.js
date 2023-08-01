import { noteCategories } from "./NoteService.js";
export class DOMHelper {

    constructor() { }

    configureOnclicks() {

    }

    showPopup(popup) {

        if (!Object.values(popups).includes(popup)) {

            console.log('wrong popup string');

            return;
        }

        document.querySelector('.popup').style.display = 'block';

        document.querySelector(`.popup .${popup}`).style.display = 'block';
    }

    hidePopup(popup) {

        if (!Object.values(popups).includes(popup)) {

            console.log('wrong popup string');

            return;
        }

        document.querySelector('.popup').style.display = 'none';

        document.querySelector(`.popup .${popup}`).style.display = 'none';
    }

    removeNoteElementById(noteId) {

        const elementToRemove = document.getElementById(`${noteId}`).parentElement;
        console.log(elementToRemove);

        elementToRemove.remove();
    }

    addNote(note) {
        const notesElement = document.getElementById('notes');
        const newNoteElement = document.createElement('tr');
        
        newNoteElement.innerHTML = `
            <td>
                <i class="fa-solid fa-clipboard-check"></i>
                ${note.name}
            </td>
            <td>${note.created}</td>
            <td>${note.category}</td>
            <td>${note.content}</td>
            <td>${note.dates ? note.dates.join('; ') : ''}</td>
            <td id="${note.id}" class="text-wrap">
                <i class="fa-solid fa-pencil" onclick=""></i>
                <i class="fa-solid fa-box-archive" onclick="setArchiveNote(this)"></i>
                <i class="fa-solid fa-trash-can" onclick="setRemoveNote(this)"></i>
            </td>
        `
        notesElement.appendChild(newNoteElement);
    }

    updateNoteStatistics(notes, archivedNotes) {
        
        const archivedNotesElement = document.getElementById('archived-notes');
        //removing all current note statistics
        archivedNotesElement
            .querySelectorAll('tr:not(:first-child)')
            .forEach(element => {
                
                element.remove();
            });
        console.log(notes, archivedNotes);
        Object.values(noteCategories).forEach(noteCategory => {
            
            const tableRowElement = document.createElement('tr');

            const noteCategoryElement = document.createElement('td');
            const noteActiveElement = document.createElement('td');
            const noteArchivedElement = document.createElement('td');

            noteCategoryElement.innerText = noteCategory;
            noteActiveElement.innerText = notes.filter(note => note.category === noteCategory).length;
            noteArchivedElement.innerText = archivedNotes.filter(note => note.category === noteCategory).length;
            
            tableRowElement.append(noteCategoryElement, noteActiveElement, noteArchivedElement);

            archivedNotesElement.appendChild(tableRowElement)
        })
    }
}

export const popups = {
    popupRemove: "popup-remove",
    popupArchive: "popup-archive",
    popupEdit: "popup-edit",
    popupCreate: "popup-create",
}