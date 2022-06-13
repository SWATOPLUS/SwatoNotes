import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  currentUser: any;

  public notes: Note[] = []
  
  public mainNote: Note = {
    title: "Мой блокнот",
    date: "",
    time: "",
    children: [
      {
        type: "inbox",
        title: "Входящие",
        date: "",
        time: "",
        children: []
      }
    ]
  } 

  public newNoteText: string = '';

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  formatDate(date: Date) {
    return (
      [
        this.padTo2Digits(date.getDate()),
        this.padTo2Digits(date.getMonth() + 1),
      ].join('.')
    );
  }

  formatTime(date: Date) {
    return ([
      this.padTo2Digits(date.getHours()),
      this.padTo2Digits(date.getMinutes()),
      this.padTo2Digits(date.getSeconds()),
    ].join(':')
    );
  }

  getCurrentDate() {
    const currentDate = new Date();
    return currentDate;
  }

  public todaysDate: string = this.formatDate(this.getCurrentDate());
  
  addNote() {
    const noteDate = this.formatDate(this.getCurrentDate());
    const noteTime = this.formatTime(this.getCurrentDate());
    this.notes.push({title: this.newNoteText, date: noteDate, time: noteTime, children: []})
    this.mainNote.children[0].children = this.notes
    this.newNoteText = "";
    this.localStorage.updateLocalStorage(this.mainNote, "notes");
  }

  removeNote(index: number) {
    this.notes.splice(index, 1);
    this.localStorage.updateLocalStorage(this.mainNote, "notes");
  }

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');
    this.mainNote = this.localStorage.getLocalStorage('notes');
    this.notes = this.mainNote.children[0].children
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}

export interface Note {
  type?: string;
  title: string;
  date: string;
  time: string;
  children: Note[];
  props?: Record<string, string>;
}
