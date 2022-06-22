import { MainComponent } from './main/main.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { NotesRoutingModule } from "./notes-routing.module";
import { ProjectsComponent } from './projects/projects.component';
import { NoteComponent } from './note/note.component';
import { RecordsComponent } from './records/records.component';
import { SortingComponent } from './sorting-component/sorting.component';


@NgModule({
    declarations: [
        MainComponent,
        ProjectsComponent,
        NoteComponent,
        RecordsComponent,
        SortingComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NotesRoutingModule,
        
    ],
    entryComponents: []
})
export class NotesModule { }
