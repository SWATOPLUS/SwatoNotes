import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note/note.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    NoteRoutingModule,
    SharedModule,
  ],
  entryComponents: []
})
export class NoteModule { }
