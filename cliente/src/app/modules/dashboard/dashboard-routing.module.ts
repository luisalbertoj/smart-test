import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'test',
        loadChildren: () =>
          import('./test/test.module').then(
            (m) => m.TestModule
          ),
      },
      {
        path: 'lesson',
        loadChildren: () =>
          import('./lessons/lessons.module').then(
            (m) => m.LessonsModule
          ),
      },
      {
        path: 'resources',
        loadChildren: () =>
          import('./resorces/resorces.module').then(
            (m) => m.ResorcesModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(
            (m) => m.AdminModule
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
