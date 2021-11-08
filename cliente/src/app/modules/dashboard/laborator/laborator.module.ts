import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratorRoutingModule } from './laborator-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../dashboard.module';
import { PlanAceptacionComponent } from './plan-aceptacion/plan-aceptacion.component';
import { PlanUnitariasIntegracionComponent } from './plan-unitarias-integracion/plan-unitarias-integracion.component';
import { PlanPruebasComponent } from './plan-pruebas/plan-pruebas.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent,
    PlanAceptacionComponent,
    PlanUnitariasIntegracionComponent,
    PlanPruebasComponent
  ],
  imports: [
    CommonModule,
    LaboratorRoutingModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewComponent,
    PlanAceptacionComponent,
    PlanUnitariasIntegracionComponent,
    PlanPruebasComponent
  ]
})
export class LaboratorModule { }
