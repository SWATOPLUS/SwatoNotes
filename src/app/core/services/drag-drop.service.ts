import { NoteService } from 'src/app/core/services/notes.service';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DragDropService {

    constructor(
        private noteService: NoteService
    ){}

    // !!! Should be called at the top of drop func
    public moveItemInGroup(prevIndexId: string, targetIndexId: string) {
        let movedNote = this.noteService.getNote(prevIndexId);
        const targetNote = this.noteService.getNote(targetIndexId); 
        this.noteService.moveNote(movedNote.id, targetNote.id);
    }


    // not universal method, just for Projects.component yet
    public moveToAnotherGroup(movedNoteId: string, containerId: string, projectId: string, inboxId: string) {
        let note = this.noteService.getNote(movedNoteId);
        switch (containerId) {
          case 'notes':
            this.noteService.setKey(note.id, undefined, undefined, 'note');
            this.noteService.setParent(note.id, projectId);
            break;
          case 'projects':
            this.noteService.setKey(note.id, undefined, undefined, 'project');
            this.noteService.setParent(note.id, projectId);
            break;
          case 'records':
            this.noteService.setKey(note.id, undefined, undefined, 'note');
            this.noteService.setParent(note.id, inboxId);
        }
    }
}
