import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportLessonsComponent } from './import-lessons/import-lessons.component';
import { ImportPreconceptosComponent } from './import-preconceptos/import-preconceptos.component';

const routes: Routes = [
  {path: 'lessons', component: ImportLessonsComponent},
  {path: 'preconceptos', component: ImportPreconceptosComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportExportRoutingModule { }
