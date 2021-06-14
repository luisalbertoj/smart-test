import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivilegiosComponent } from './privilegios/privilegios.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'user', component: UserComponent},
  {path: 'privilegios', component: PrivilegiosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
