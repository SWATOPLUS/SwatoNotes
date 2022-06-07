import { Component, OnInit } from '@angular/core';
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

  public notes: Note[] = [
  {text: "Закрыть окно", date: "22:10"},
  {text: "Покупки", date: "10:13"},
  {text: "Встреча", date: "21:17"},
  {text: "Просто много текста", date: "06:36"},
]

  public newNoteText: string = '';

  formatDate(date: Date) {
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0')
    }
    return (
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
      ].join('.') + ' / ' + [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  addNote() {
    const currentDate = new Date()
    const noteDate = this.formatDate(currentDate)
    this.notes.push({text: this.newNoteText, date: noteDate})
    this.newNoteText = "";
  }

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger) {
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

type Note = {
  text: string;
  date: string;
}

