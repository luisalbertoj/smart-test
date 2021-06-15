import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { PrivilegiosComponent } from './privilegios/privilegios.component';
import { MaterialModule } from './../../../app.module';


@NgModule({
  declarations: [UserListComponent, UserComponent, PrivilegiosComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsersModule { }
