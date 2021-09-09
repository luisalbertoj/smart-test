import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { ResultComponent } from './result/result.component';
import { VercalificarComponent } from './vercalificar/vercalificar.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'new', component: NewLessonComponent},
  {path: 'result', component: ResultComponent},
  {path: 'vercalificar', component: VercalificarComponent },
  {path: 'lesson-detail/:slug', component: LessonDetailComponent},
  {path: ':slug', component: LessonViewComponent},
  {path: 'lesson-detail/:slug', component: LessonDetailComponent},
  {path: 'lesson-editar/:slug', component: NewLessonComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
