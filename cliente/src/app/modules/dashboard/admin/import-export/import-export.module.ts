import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportExportRoutingModule } from './import-export-routing.module';
import { ImportLessonsComponent } from './import-lessons/import-lessons.component';
import {ProgressComponent} from './progress/progress.component';
import { DndDirective } from './dnd.directive';


@NgModule({
  declarations: [
    ImportLessonsComponent,
    DndDirective,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    ImportExportRoutingModule
  ]
})
export class ImportExportModule { }
