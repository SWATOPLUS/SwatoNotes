import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Note, NoteService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  currentUser: any;

  public project: Note | any;
  public subProjects: any;
  public notes: Note [] = [];
  public inboxRecord: Note[] = [];
  private subscription: Subscription;

  public newNoteText: string = "";
  public newProjectText: string = "";

  displayDate(note: Note) {
    return note.creationLocalDateTime;
  }

  reload() {
    this.notes = this.noteService.getChildren(this.project.id).filter(x => x.type === 'note');
    this.subProjects = this.noteService.getChildren(this.project.id).filter(x => x.type === 'project');
  }

  removeNote(note: Note) {
    this.noteService.removeNote(note.id);
    this.reload();
  }
  
  addNote() {
    this.noteService.addNote(this.newNoteText, 'note', this.project.id);
    this.reload();
    this.newNoteText = "";
  }

  addProject() {
    this.noteService.addNote(this.newProjectText, "project", this.project.id);
    this.newProjectText = "";
    this.reload();
  }

  reloadProject(id: string) {
    this.project = this.noteService.getNote(id);
    const inbox = this.noteService.getTool(this.project.id, 'inbox');
    this.inboxRecord = this.noteService.getChildren(inbox?.id);
    this.subProjects = this.noteService.getChildren(this.project?.id).filter(x => x.type === 'project');
    this.notes = this.noteService.getChildren(this.project?.id).filter(x => x.type === 'note');
  }

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,) {
      this.subscription = this.activatedRoute.params.subscribe(params => this.reloadProject(params["id"]));
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
