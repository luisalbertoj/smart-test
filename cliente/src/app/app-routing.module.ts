import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardPersonaGuard } from './guard-persona.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/page/page.module').then(
        (m) => m.PageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [GuardPersonaGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
