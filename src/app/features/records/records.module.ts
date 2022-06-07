import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records/records.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RecordsComponent],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class RecordsModule { }
