import DateHelper from "./DateHelper.js";
import { noteCategories } from "./NoteService.js";
export class DOMHelper {

    constructor() { }

    showPopup(popup) {

        if (!Object.values(popups).includes(popup)) {

            console.log('wrong popup string');

            return;
        }

        document.querySelector('.popup').style.display = 'block';

        document.querySelector(`.popup .${popup}`).style.display = 'block';
    }

    closePopup(popup) {

        if (!Object.values(popups).includes(popup)) {

            console.log('wrong popup string');

            return;
        }
        if (popup === popups.popupCreate) {

            this.clearCreatePopup();
        }
        if (popup === popups.popupEdit) {

            this.clearEditPopup();
        }
        document.querySelector('.popup').style.display = 'none';

        document.querySelector(`.popup .${popup}`).style.display = 'none';
    }

    clearEditPopup() {
        document.getElementById('edit-note-name').value = '';
        document.getElementById('edit-note-category').value = '';
        document.getElementById('edit-note-content').value = '';
    }

    clearCreatePopup() {
        document.getElementById('create-note-name').value = '';
        document.getElementById('create-note-category').value = '';
        document.getElementById('create-note-content').value = '';
    }

    removeNoteElementById(noteId) {

        const elementToRemove = document.getElementById(`${noteId}`).parentElement;
        console.log(elementToRemove);

        elementToRemove.remove();
    }

    removeArchivedNoteElementById(noteId) {

        const elementToRemove = document.getElementById(`${noteId}`);
        console.log(elementToRemove);

        elementToRemove.remove();
    }

    addNote(note) {
        const notesElement = document.getElementById('notes');
        const newNoteElement = document.createElement('tr');

        newNoteElement.innerHTML = `
            <td class="note-name">
                <i class="fa-solid fa-clipboard-check"></i>
                ${note.name}
            </td>
            <td class="note-created">${note.created}</td>
            <td class="note-category">${note.category}</td>
            <td class="note-content">${note.content}</td>
            <td class="note-dates">${note.dates ? note.dates.join('; ') : ''}</td>
            <td id="${note.id}" class="text-wrap">
                <i class="fa-solid fa-pencil" onclick="setEditNote(this)"></i>
                <i class="fa-solid fa-box-archive" onclick="setArchiveNote(this)"></i>
                <i class="fa-solid fa-trash-can" onclick="setRemoveNote(this)"></i>
            </td>
        `
        notesElement.appendChild(newNoteElement);
    }

    updateNote(note) {
        const noteElementToUpdate = document.getElementById(note.id).parentElement;
        if (!noteElementToUpdate) {
            return;
        }
        noteElementToUpdate.querySelector('.note-name').innerHTML = `
            <i class="fa-solid fa-clipboard-check"></i>
            ${note.name}
        `;

        noteElementToUpdate.querySelector('.note-category').innerHTML = note.category;

        noteElementToUpdate.querySelector('.note-content').innerHTML = note.content;

        noteElementToUpdate.querySelector('.note-dates').innerHTML = note.dates;
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

            tableRowElement.onclick = () => {

                new DOMHelper().fillArchivedPopup(noteCategory, archivedNotes);
            }

            noteCategoryElement.innerText = noteCategory;
            noteActiveElement.innerText = notes.filter(note => note.category === noteCategory).length;
            noteArchivedElement.innerText = archivedNotes.filter(note => note.category === noteCategory).length;

            tableRowElement.append(noteCategoryElement, noteActiveElement, noteArchivedElement);

            archivedNotesElement.appendChild(tableRowElement)
        })
    }

    fillArchivedPopup(category, archivedNotes) {

        document.getElementById('archived-notes-title').innerText = `Archived notes (Category - ${category})`;

        const archivedNoteTableElement = document.getElementById('archived-table');
        //removing all current archived notes statistics
        archivedNoteTableElement
            .querySelectorAll('tr:not(:first-child)')
            .forEach(element => {

                element.remove();
            });

        archivedNotes = archivedNotes
            .filter(archivedNote => archivedNote.category === category);

        if (archivedNotes.length > 0) {
            archivedNotes.forEach(archivedNote => {
                const archNoteElement = document.createElement('tr');

                archNoteElement.innerHTML = `
                <td>${archivedNote.name}</td>
                <td>${archivedNote.content}</td>
                <td onclick="unarchive(this)">
                    <i class="fa-solid fa-arrow-up-from-bracket">
                    </i>
                </td>
                `
                archNoteElement.id = archivedNote.id;
                archivedNoteTableElement.children.item(0).appendChild(archNoteElement);
            })
        }

        this.showPopup(popups.popupArchived);

    }

    fillEditNoteInfo(note) {

        document.getElementById('edit-note-name').value = note.name;

        document.getElementById('edit-note-category').value = note.category;

        document.getElementById('edit-note-content').value = note.content;
    }

    getEditNoteInfo() {

        const noteEditId = window.localStorage.getItem('editNoteId');

        if (noteEditId === '') {
            return;
        }
        const newNoteName = document.getElementById('edit-note-name').value;

        const newNoteCategory = document.getElementById('edit-note-category').value;

        const newContent = document.getElementById('edit-note-content').value;

        const newDates = DateHelper.getDatesFromContent(newContent);

        return {
            name: newNoteName,
            category: newNoteCategory,
            content: newContent,
            dates: newDates,
            id: noteEditId
        }
    }

    getCreateNodeInfo() {

        const newNoteName = document.getElementById('create-note-name').value;

        const newNoteCategory = document.getElementById('create-note-category').value;

        const newContent = document.getElementById('create-note-content').value;

        const newDates = DateHelper.getDatesFromContent(newContent);

        return {
            name: newNoteName,
            category: newNoteCategory,
            content: newContent,
            dates: newDates
        }
    }
}

export const popups = {
    popupRemove: "popup-remove",
    popupArchive: "popup-archive",
    popupEdit: "popup-edit",
    popupCreate: "popup-create",
    popupArchived: "popup-archived"
}