import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

export interface Note {
    id: string;
    parentId: string;
    type: string;
    title: string;
    creationLocalDateTime: number;
}

@Injectable({ providedIn: 'root' })
export class NoteService {
    private notes: Note[];

    constructor(
      private localStorage: LocalStorageService
    ) {
      const data = this.localStorage.get<Note[]>('notes');
      if(!data) {
        this.notes = [];
        this.addNote('Главная', 'index', uuid.NIL, uuid.NIL);
        this.addNote('Входящие', 'inbox', uuid.NIL);
      } else {
        this.notes = data;
      }
    }

    public getMainNote() {
      return this.getNote(uuid.NIL)!;
    }

    public getNote(id: string) {
        return this.notes.find(x => x.id === id);
    }

    public getTool(parentId: string, type: string) {
      const existingTool = this.getChildren(parentId).filter(x => x.type === type)[0];
      if(existingTool) {
        return existingTool
      }
      const id = this.addNote('', type, parentId);
      return this.getNote(id)!;
    }

    public getChildren(parentId: string) {
        return this.notes.filter(x => x.parentId === parentId);
    }

    public addNote(title: string, type: string, parentId: string, defaultId?: string) {
      const id = defaultId || uuid.v4();
      const date = Date.now();
      this.notes.push({id, title, creationLocalDateTime: date, type, parentId});
      this.localStorage.set('notes', this.notes);
      return id
    }

    public removeNote(id: string) {
      const index = this.notes.findIndex(n => n.id === id);
      this.notes.splice(index, 1);
      this.localStorage.set('notes', this.notes);
    }

    public setParent(noteId: string, newParentId: string) {
      const note = this.getNote(noteId);
      note!.parentId = newParentId;
      this.localStorage.set('notes', this.notes);
    }
}
