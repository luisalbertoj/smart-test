import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { ListComponent } from './list/list.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardModule } from '../dashboard.module';


@NgModule({
  declarations: [
    ListComponent,
    DetalleComponent
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
