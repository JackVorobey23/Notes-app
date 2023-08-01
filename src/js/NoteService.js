export class NoteService {

    constructor() {
        this.notes = [
            {
                name: "Shopping List",
                created: "April 27, 2021",
                category: "Task",
                content: "Tomatoes, Bread 3/5/2021 5/5/2021 5/5/5000",
                dates: ["3/5/2021", "5/5/2021"],
                id: "0000"
            },
            {
                name: "Personal Notes",
                created: "July 15, 2021",
                category: "Random Thought",
                content: "Meeting at 3 PM 7/16/2021",
                dates: ['7/16/2021'],
                id: "1111"
            },
            {
                name: "Shopping List",
                created: "August 5, 2021",
                category: "Random Thought",
                content: "Submit report, Prepare presentation for 8/8/2021",
                dates: ['8/8/2021'],
                id: "2222"
            }
        ]
        this.archivedNotes = [];
    }

    addNote(note) {

        this.notes.push(note);
    }

    updateNote(note) {

        const noteToUpdate = this.notes.find(_note => _note.id === note.id);

        if (!noteToUpdate) {
            return {
                success: false,
                errorMsg: `note with id=${note.id} doesn't exist`
            }
        }
        Object.keys(note).forEach(newNoteKey => {
            noteToUpdate[newNoteKey] = note[newNoteKey];
        })
        return {
            success: true,
            errorMsg: null
        }
    }

    removeNote(noteId) {

        if (!this.notes.find(note => note.id === noteId)) {

            return {
                success: false,
                errorMsg: `note with id=${noteId} doesn't exist`
            }
        }
        else {

            this.notes = this.notes.filter(note => note.id !== noteId);

            return {
                success: true,
                errorMsg: null
            }
        }
    }

    archiveNote(noteId) {

        const noteToArchive = this.notes.find(note => note.id === noteId);

        if (!noteToArchive) {

            return {
                success: false,
                errorMsg: `note with id=${noteId} doesn't exist`
            }
        }
        else {

            this.notes = this.notes.filter(note => note.id !== noteId);

            this.archivedNotes.push(noteToArchive);

            return {
                success: true,
                errorMsg: null
            }
        }
    }

    unarchiveNote(noteId) {
        const noteToUnarchive = this.archivedNotes.find(note => note.id === noteId);

        if (!noteToUnarchive) {

            return {
                success: false,
                errorMsg: `archived note with id=${noteId} doesn't exist`
            }
        }
        else {

            this.archivedNotes = this.archivedNotes.filter(note => note.id !== noteId);

            this.notes.push(noteToUnarchive);

            return {
                success: true,
                errorMsg: null
            }
        }
    }

    getNoteById(noteId) {
        return this.notes.find(note => note.id === noteId)
    }

    getArchivedNotes() {
        return this.archivedNotes;
    }
}

export const noteCategories = {
    task: "Task",
    randomThought: "Random Thought",
    idea: "Idea"
};