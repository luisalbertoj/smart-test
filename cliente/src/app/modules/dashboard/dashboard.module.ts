import { NgModule } from '@angular/core';



import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { FooterComponent } from './footer/footer.component';
import { CourseComponent } from './course/course.component';


@NgModule({
  declarations: [HomeComponent, LayoutComponent, DashboardComponent, HeaderComponent, CourseDetailComponent, FooterComponent, CourseComponent],
  imports: [
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
