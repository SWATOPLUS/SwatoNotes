import { Note } from 'src/app/core/services/notes.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.css'],
})
export class NoteWidgetComponent implements OnInit {
  @Input() items: Note[] = [];
  @Input() header: string = '';
  @Input() placeholder: string = '';
  @Input() hideDate: boolean = true;
  @Input() project!: Note;
  @Input() listId: string = 'note';
  @Output() dropItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<Note>();
  @Output() addNewItem = new EventEmitter<string>();

  public newItemText: string = '';

  public currentDate: number = new Date().getDate();
  public isClickable: boolean = false;
  public hideSortLink: boolean = true;

  checkClickable() {
    if (this.header === 'MAIN' || this.header === 'Проекты') {
      this.isClickable = true;
    } else {
      this.isClickable = false;
    }
  }

  isSortable() {
    if (this.project) {
      this.hideSortLink = false;
    }
  }

  displayDate(itemDate: number) {
    const date = new Date(itemDate).getDate();
    const month = new Date(itemDate).getMonth() + 1;
    const hour = new Date(itemDate).getHours();
    const minutes = new Date(itemDate).getMinutes();
    const seconds = new Date(itemDate).getSeconds();
    
    const fullDate = [date, month].map(d => checkFigures(d)).join('.');
    const time = [hour, minutes, seconds].map(d => checkFigures(d)).join(':');

    function checkFigures(figure: number) {
      let newFigure =  "0" + figure;
      if(figure < 10) {
        return newFigure
      }
      return figure
    }

    if (this.currentDate == date) {
      return time;
    }
    return fullDate + ' ' + time;
  }

  addItem() {
    this.addNewItem.emit(this.newItemText);
    this.newItemText = '';
  }

  navToEdit(id: string) {
    this.router.navigate([`/notes/note/${id}`]);
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkClickable();
    this.isSortable();
  }
}
