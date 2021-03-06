import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Note, NoteService } from 'src/app/core/services/notes.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-records',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css'],
})
export class SortingComponent implements OnInit {
  currentUser: any;
  private subscription: Subscription;

  public mainProject!: any;
  public inbox!: Note;
  public mainInbox: Note[] = [];
  public projects: Note[] = [];

  skipItem() {
    this.mainInbox.push(this.mainInbox[0]);
    this.mainInbox.shift();
  }

  sortToNotes() {
    this.noteService.setParent(this.mainInbox[0].id, this.mainProject.id);
    this.reload();
    this.checkNotes();
  }

  sort(id: string) {
    const newInbox = this.noteService.getTool(id, 'inbox');
    this.noteService.setParent(this.mainInbox[0].id, newInbox.id);
    this.reload();
    this.checkNotes();
  }

  findProjectWithRecords(id: string): string | null {
    const inbox = this.noteService.getTool(id, 'inbox');
    const children = this.noteService
      .getChildren(inbox.id)
      .filter((e) => e.type === 'note');
    if (children.length) {
      return id;
    }
    const projects = this.noteService
      .getChildren(id)
      .filter((e) => e.type === 'project');
    for (let project of projects) {
      const result = this.findProjectWithRecords(project.id);
      if (result === null) {
        continue;
      }
      return result;
    }
    return null;
  }

  checkNotes() {
    if (!this.mainInbox.length) {
      const sortProject = this.findProjectWithRecords(uuid.NIL);
      if (sortProject !== null) {
        this.router.navigate([`/notes/sorting/${sortProject}`]);
      }
      if (sortProject === null) {
        this.notificationService.openSnackBar(
          'Here is no notes for sorting anymore'
        );
        this.router.navigate([`/notes/main`]);
      }
    }
  }

  reload() {
    this.mainInbox = this.noteService
      .getChildren(this.inbox.id)
      .filter((x) => x.type === 'note');
  }

  reloadComponent(id: string) {
    const mainNote = this.noteService.getMainNote();
    this.inbox = this.noteService
      .getChildren(id)
      .filter((x) => x.type === 'inbox')[0];
    this.projects = this.noteService
      .getChildren(id)
      .filter((x) => x.type === 'project');
    this.mainProject = this.noteService.getNote(id);
    this.mainInbox = this.noteService
      .getChildren(this.inbox.id)
      .filter((x) => x.type === 'note');
    this.checkNotes();
  }

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.activatedRoute.params.subscribe((params) =>
      this.reloadComponent(params['id'])
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
