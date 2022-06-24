import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Note, NoteService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  currentUser: any;

  public header: string = 'Записи';
  public placeholder: string = 'Новая заметка';
  public records: Note[] = [];
  public inbox!: Note;


  reload() {
    this.records = this.noteService.getChildren(this.inbox.id);
  }

  removeNote(note: Note) {
    this.noteService.removeNote(note.id);
    this.reload();
  }
  
  addNote(newNoteText: string) {
    this.noteService.addNote(newNoteText, 'note', this.inbox.id);
    this.reload();
  }

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private noteService: NoteService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');
    const mainNote = this.noteService.getMainNote();
    this.inbox = this.noteService.getChildren(mainNote.id).filter(x => x.type === 'inbox')[0];
    this.reload();
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
