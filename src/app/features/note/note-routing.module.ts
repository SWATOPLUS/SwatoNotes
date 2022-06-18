import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { NoteComponent } from './note/note.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: ':id', component: NoteComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
