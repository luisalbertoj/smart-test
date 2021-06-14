import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';

const routes: Routes = [

  {path: 'user', component: UserComponent},
  {path: 'user-list', component: UserListComponent}

 /*  {
    path: '',
    loadChildren: () =>
      import('./users/users.module').then(
        (m) => m.UsersModule
      ),
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
