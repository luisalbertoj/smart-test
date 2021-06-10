import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseComponent } from './course/course.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',
   component: DashboardComponent,
   children: [
     {
       path: '', component: HomeComponent
     },
     {
       path: 'course-detail/:slug', component: CourseDetailComponent
     },
     {
       path: 'course/:slug', component: CourseComponent
     },
     {
      path: 'test',
      loadChildren: () =>
        import('./test/test.module').then(
          (m) => m.TestModule 
        ),
    },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
