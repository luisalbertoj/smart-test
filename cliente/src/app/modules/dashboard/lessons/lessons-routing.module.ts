import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewLessonComponent } from './new-lesson/new-lesson.component';

const routes: Routes = [
  {path: 'new', component: NewLessonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
