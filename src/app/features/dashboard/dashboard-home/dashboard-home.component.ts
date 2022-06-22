import { NoteService } from 'src/app/core/services/notes.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;

  public newNotes: string[][] = [] 
  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private noteService: NoteService) {
  }
  async onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    const data = await file.text();
    const dataArray = data.split(/\r?\n|\r/);
    this.groupNotes(dataArray);
    console.log(this.newNotes)
  }

  groupNotes(dataArray: string[]) {
    let group: string[] = [];
    for(const item of dataArray) {
      if(item !== '') {
        group.push(item)
      }
      if(item === '') {
        if(group.length) {
          this.newNotes.push(group);
          group = [];
        }
      }
    }
  }

  addNotes() {
    const mainNote = this.noteService.getMainNote();
    const inbox = this.noteService.getChildren(mainNote.id).find(e => e.type === 'inbox');
    this.noteService.addNote('Imported', 'project', inbox!.id);
    const folder = this.noteService.getChildren(inbox!.id).find(e => e.type === 'project');
    for(const note of this.newNotes) {
      const joinedNote = note.join(', ');
      this.noteService.addNote(joinedNote, 'note', folder!.id)
    }
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle('angular-material-template - Dashboard');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
