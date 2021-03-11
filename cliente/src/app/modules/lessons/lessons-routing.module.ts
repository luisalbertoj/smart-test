import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLessonsComponent } from './home-lessons/home-lessons.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [
  {path: '', component: HomeLessonsComponent},
  {path: 'lesson', component: LessonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
