import { LayoutComponent } from './../../shared/layout/layout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { NoteComponent } from './note/note.component';
import { ProjectsComponent } from './projects/projects.component';
import { RecordsComponent } from './records/records.component';
import { SortingComponent } from './sorting-component/sorting.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'main', component: MainComponent },
            { path: 'note/:id', component: NoteComponent },
            { path: 'project/:id', component: ProjectsComponent },
            { path: 'records', component: RecordsComponent },
            { path: 'sorting', redirectTo: 'sorting/00000000-0000-0000-0000-000000000000', component: SortingComponent },
            { path: 'sorting/:id', component: SortingComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotesRoutingModule { }
