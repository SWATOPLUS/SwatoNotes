import { AuthenticationService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Note, NoteService } from 'src/app/core/services/notes.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  currentUser: any;

  private subscription: Subscription;

  public note!: Note | any;
  public date: string = '';

  public newTitleText: string = '';
  public newDescriptionText: string = '';

  setTitle() {
    this.note.title = this.newTitleText;
    this.newTitleText = '';
  }
  setDescription() {
    this.note.description = this.newDescriptionText;
    this.newDescriptionText = '';
  }

  setChanges() {
    this.noteService.setKey(
      this.note.id,
      this.note.title,
      this.note.description
    );
    this.reload(this.note.id);
  }

  removeChanges() {
    this.reload(this.note.id);
  }

  reload(id: string) {
    this.note = this.noteService.getNote(id);
    this.date = new Date(this.note.creationLocalDateTime).toDateString();
  }

  constructor(
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = this.activatedRoute.params.subscribe((params) =>
      this.reload(params['id'])
    );
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');
    this.logger.log('Dashboard loaded');
  }
}
