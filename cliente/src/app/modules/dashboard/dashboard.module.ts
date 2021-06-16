import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [HomeComponent, LayoutComponent, DashboardComponent, HeaderComponent, FooterComponent],
  imports: [
    DashboardRoutingModule,
    NgxSpinnerModule,
    NgCircleProgressModule,
    CommonModule
  ]
})
export class DashboardModule { }
