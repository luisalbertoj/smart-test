import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { DashboardModule } from '../dashboard.module';
import { PlanPruebasComponent } from './plan-pruebas/plan-pruebas.component';
import { PlanUnitariasIntegracionComponent } from './plan-unitarias-integracion/plan-unitarias-integracion.component';
import { PlanAceptacionComponent } from './plan-aceptacion/plan-aceptacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent,
    PlanPruebasComponent,
    PlanUnitariasIntegracionComponent,
    PlanAceptacionComponent
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LaboratoryModule { }
