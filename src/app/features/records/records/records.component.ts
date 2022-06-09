import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  currentUser: any;

  public notes: Note[] = []

  public notesCondition: boolean = false;

  public newNoteText: string = '';

  getNotesLocalStorage() {
    const data = localStorage.getItem('notes');
    if (data != null) {
      console.log("not null")
      this.notesCondition = true
      return JSON.parse(data)
    }
    console.log("null");
    return []
  }

  updateNotesLocalStorage(notes: Note[]) {
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(notes));
  }

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
    this.notes.push({text: this.newNoteText, date: noteDate, time: noteTime})
    this.newNoteText = "";
    this.updateNotesLocalStorage(this.notes);
  }

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');
    this.notes = this.getNotesLocalStorage();
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}

type Note = {
  text: string;
  date: string;
  time: string;
} 

