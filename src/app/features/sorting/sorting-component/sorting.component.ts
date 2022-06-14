import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { Note } from '../../records/records/records.component';

@Component({
  selector: 'app-records',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {
  currentUser: any;

  public notes: Note[] = []
  public tasks: Note[] = []
  public knowledge: Note[] = []
  
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
      },
      {
        type: "knowledge",
        title: "Знание",
        date: "",
        time: "",
        children: []
      },
      {
        type: "task",
        title: "Задача",
        date: "",
        time: "",
        children: []
      },
    ]
  } 
  
  skipItem() {
    this.notes.push(this.notes[0]);
    this.notes.shift();
    this.localStorage.updateLocalStorage(this.mainNote, 'notes');
  }

  sort(parent: any) {
    parent.push(this.notes[0]);
    this.notes.shift();
    this.localStorage.updateLocalStorage(this.mainNote, 'notes');
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
    this.notes = this.mainNote.children[0].children;
    this.knowledge = this.mainNote.children[1].children;
    this.tasks = this.mainNote.children[2].children;
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
