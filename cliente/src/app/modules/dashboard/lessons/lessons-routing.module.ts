import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new', component: NewLessonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
