import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Note, NoteService } from 'src/app/core/services/notes.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  currentUser: any;

  public project: Note | any;
  public inbox: Note | any;
  public subProjects: any;
  public notes: Note[] = [];
  public inboxRecord: Note[] = [];
  public recordsListId: string = 'records';
  public projectsListId: string = 'projects';
  public notesListId: string = 'notes';
  private subscription: Subscription;

  public notesPlaceholder: string = 'Новая заметка';
  public notesHeader: string = 'Заметки';
  public projectPlaceholder: string = 'Новый проект';
  public projectHeader: string = 'Проекты';
  public recordsPlaceholder: string = 'Новая запись';
  public recordsHeader: string = 'Входящие записи';

  displayDate(note: Note) {
    return note.creationLocalDateTime;
  }

  removeNote(note: Note) {
    this.noteService.removeNote(note.id);
    this.reload();
  }

  addNote(newNoteText: string) {
    this.noteService.addNote(newNoteText, 'note', this.project.id);
    this.reload();
  }

  addProject(newProjectText: string) {
    this.noteService.addNote(newProjectText, 'project', this.project.id);
    this.reload();
  }

  addRecord(newRecordText: string) {
    this.noteService.addNote(newRecordText, 'note', this.inbox.id);
    this.reload();
  }

  drop(event: CdkDragDrop<Note[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let eventNote = event.container.data[event.currentIndex];
      let note = this.noteService.getNote(eventNote.id);
      const eventNeighbor = event.container.data[event.currentIndex + 1];
      const neighborNote = this.noteService.getNote(eventNeighbor.id); 
      this.noteService.moveNote(note.id, neighborNote.id);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let eventNote = event.container.data[event.currentIndex];
      let note = this.noteService.getNote(eventNote.id);
      switch (event.container.id) {
        case 'notes':
          this.noteService.setKey(note.id, undefined, undefined, 'note');
          this.noteService.setParent(note.id, this.project.id);
          break;
        case 'projects':
          this.noteService.setKey(note.id, undefined, undefined, 'project');
          this.noteService.setParent(note.id, this.project.id);
          break;
        case 'records':
          this.noteService.setKey(note.id, undefined, undefined, 'note');
          this.noteService.setParent(note.id, this.inbox.id);
      }
    }
    this.reload();
  }

  reload() {
    this.notes = this.noteService
      .getChildren(this.project.id)
      .filter((x) => x.type === 'note');
    this.subProjects = this.noteService
      .getChildren(this.project.id)
      .filter((x) => x.type === 'project');
    this.inboxRecord = this.noteService.getChildren(this.inbox.id);
  }

  reloadProject(id: string) {
    this.project = this.noteService.getNote(id);
    this.inbox = this.noteService.getTool(this.project.id, 'inbox');
    this.inboxRecord = this.noteService.getChildren(this.inbox.id);
    this.subProjects = this.noteService
      .getChildren(this.project?.id)
      .filter((x) => x.type === 'project');
    this.notes = this.noteService
      .getChildren(this.project?.id)
      .filter((x) => x.type === 'note');
  }

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = this.activatedRoute.params.subscribe((params) =>
      this.reloadProject(params['id'])
    );
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
