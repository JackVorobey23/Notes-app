export class NoteService {

    constructor() {
        this.notes = [
            {
                name: "Shopping List",
                created: "April 27, 2021",
                category: "Task",
                content: "Tomatoes, Bread",
                dates: ['3/5/2021', '5/5/2021'],
                id: "0000"
            }, 
            {
                name: "Personal Notes",
                created: "July 15, 2021",
                category: "Random Thought",
                content: "Meeting at 3 PM",
                dates: ['7/16/2021', '7/18/2021'],
                id: "1111"
            }, 
            {
                name: "Shopping List",
                created: "August 5, 2021",
                category: "Random Thought",
                content: "Submit report, Prepare presentation",
                dates: ['8/6/2021', '8/8/2021'],
                id: "2222"
            }
        ]
        this.archivedNotes = [];
    }

    addNote(note) {

        this.notes.push(note);
    }

    removeNote(noteId) {
        console.log(this.notes);
        if (!this.notes.find(note => note.id === noteId)) {
            
            return {
                success: false,
                error: `note with id=${noteId} doesn't exist`
            }
        }
        else {
            
            this.notes = this.notes.filter(note => note.id !== noteId);
            
            return {
                success: true,
                error: null
            }
        }
    }

    archiveNote(noteId) {
        
        const noteToArchive = this.notes.find(note => note.id === noteId);
        
        if (!noteToArchive) {
            
            return {
                success: false,
                error: `note with id=${noteId} doesn't exist`
            }
        }
        else {
            
            this.notes = this.notes.filter(note => note.id !== noteId);
            
            this.archivedNotes.push(noteToArchive);
            
            return {
                success: true,
                error: null
            }
        }
    }

    getNotes() {
        return this.notes;
    }

    getArchivedNotes() {
        return this.archivedNotes;
    }

    formatCreatedDate(dateString) {

        const options = { month: 'long', day: 'numeric', year: 'numeric' };

        return new Date(dateString).toLocaleString('en-US', options);
    }

    formatDate(dateString) {

        const date = new Date(dateString);

        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }
}

export const noteCategories = {
    task: "Task",
    randomThought: "Random Thought",
    idea: "Idea"
};