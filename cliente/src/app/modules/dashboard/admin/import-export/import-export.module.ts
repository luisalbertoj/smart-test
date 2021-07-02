import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportExportRoutingModule } from './import-export-routing.module';
import { ImportLessonsComponent } from './import-lessons/import-lessons.component';


@NgModule({
  declarations: [
    ImportLessonsComponent
  ],
  imports: [
    CommonModule,
    ImportExportRoutingModule
  ]
})
export class ImportExportModule { }
