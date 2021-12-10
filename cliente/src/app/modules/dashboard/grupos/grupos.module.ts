import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { ListComponent } from './list/list.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardModule } from '../dashboard.module';
import { NewGrupoComponent } from './new-grupo/new-grupo.component';


@NgModule({
  declarations: [
    ListComponent,
    DetalleComponent,
    NewGrupoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
    DashboardModule,
    GruposRoutingModule
  ]
})
export class GruposModule { }
