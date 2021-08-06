import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { DashboardModule } from '../dashboard.module';
import { PlanPruebasComponent } from './plan-pruebas/plan-pruebas.component';



@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent,
    PlanPruebasComponent
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
    DashboardModule
  ]
})
export class LaboratoryModule { }
