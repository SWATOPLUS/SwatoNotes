import { Note, NoteService } from 'src/app/core/services/notes.service';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-customer-list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public mainNote!: Note
  public projects: Note[] = [];

  constructor(
    private logger: NGXLogger,
    private titleService: Title,
    private noteService: NoteService, 
  ) { }

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
