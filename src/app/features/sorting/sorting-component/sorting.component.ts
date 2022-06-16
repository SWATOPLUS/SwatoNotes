import { Note, NoteService } from 'src/app/core/services/notes.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-records',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {
  currentUser: any;

  public inbox: any
  public mainInbox: Note[] = [];
  public projects: Note[] = [];
  
  
  skipItem() {
    this.mainInbox.push(this.mainInbox[0]);
    this.mainInbox.shift();
  }

  sort(id: string) {
    const newInbox = this.noteService.getChildren(id).filter(x => x.type === 'inbox')[0];
    this.noteService.sortNote(newInbox.id, this.mainInbox[0]);
    this.reload();
  }

  reload() {
    this.mainInbox = this.noteService.getChildren(this.inbox.id).filter(x => x.type === 'note');
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
    this.mainInbox = this.noteService.getChildren(this.inbox.id).filter(x => x.type === 'note');
    this.projects = this.noteService.getChildren(mainNote.id).filter(x => x.type === 'project');
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
