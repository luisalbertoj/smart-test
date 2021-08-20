import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportExportRoutingModule } from './import-export-routing.module';
import { ImportLessonsComponent } from './import-lessons/import-lessons.component';
import {ProgressComponent} from './progress/progress.component';
import { DndDirective } from './dnd.directive';
import { ImportPreconceptosComponent } from './import-preconceptos/import-preconceptos.component';
import { DashboardModule } from '../../dashboard.module';


@NgModule({
  declarations: [
    ImportLessonsComponent,
    DndDirective,
    ProgressComponent,
    ImportPreconceptosComponent,
  ],
  imports: [
    CommonModule,
    DashboardModule,
    ImportExportRoutingModule
  ]
})
export class ImportExportModule { }
