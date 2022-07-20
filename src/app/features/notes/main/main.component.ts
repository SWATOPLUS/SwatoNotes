import { DragDropService } from './../../../core/services/drag-drop.service';
import { Note, NoteService } from 'src/app/core/services/notes.service';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-customer-list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  public header: string = 'MAIN';
  public placeholder: string = 'Новый проект';
  public mainNote!: Note
  public projects: Note[] = [];

  constructor(
    private logger: NGXLogger,
    private titleService: Title,
    private noteService: NoteService,
    private dragDropService: DragDropService  
  ) { }

  drop(event: CdkDragDrop<Note[]>) {
    this.dragDropService.moveItemInGroup(
      event.container.data[event.previousIndex].id,
      event.container.data[event.currentIndex].id
    );
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.reload();
  }

  reload() {
    this.projects = this.noteService.getChildren(this.mainNote.id);
  }

  addProject(newProjectText: string) {
    this.noteService.addNote(newProjectText, "project", this.mainNote.id);
    this.reload();
  }

  removeProject(note: Note) {
    this.noteService.removeNote(note.id);
    this.reload();
  }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.logger.log('Customers loaded');
    this.mainNote = this.noteService.getMainNote();
    this.projects = this.noteService.getChildren(this.mainNote.id);
    this.reload();
  }
}
