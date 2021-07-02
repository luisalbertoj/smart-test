import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./users/users.module').then(
        (m) => m.UsersModule
      ),
  },
  {
    path: 'import-export',
    loadChildren: () =>
      import('./import-export/import-export.module').then(
        (m) => m.ImportExportModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
