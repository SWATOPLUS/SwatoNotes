import { Note } from 'src/app/core/services/notes.service';
import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'app-note-widget',
    templateUrl: './note-widget.component.html',
    styleUrls: ['./note-widget.component.css']
  })
export class NoteWidgetComponent {
    @Input() projects: Note[] = [];
    @Output() removeProject = new EventEmitter<Note>()
    @Output() addNewProject = new EventEmitter<string>()

    public newProjectText: string = "";

    addProject() {
        this.addNewProject.emit(this.newProjectText);
        this.newProjectText = "";
    }
}
