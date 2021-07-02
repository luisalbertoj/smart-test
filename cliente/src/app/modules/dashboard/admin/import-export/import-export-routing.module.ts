import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportLessonsComponent } from './import-lessons/import-lessons.component';

const routes: Routes = [
  {path: 'lessons', component: ImportLessonsComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportExportRoutingModule { }
