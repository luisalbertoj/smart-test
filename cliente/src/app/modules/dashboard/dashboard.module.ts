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
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { SearchElementComponent } from './components/search-element/search-element.component';
import { AddElementComponent } from './components/add-element/add-element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndDirective } from './dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { EmailComponent } from './components/email/email.component';
import { EmailService } from 'src/app/services/email.service';



@NgModule({
  declarations: [HomeComponent, LayoutComponent, DashboardComponent, HeaderComponent, FooterComponent, UploadFileComponent, SearchElementComponent, AddElementComponent,  DndDirective,
    ProgressComponent,
    EmailComponent],
  imports: [
    DashboardRoutingModule,
    NgxSpinnerModule,
    NgCircleProgressModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UploadFileComponent,
    SearchElementComponent,
    AddElementComponent,
    EmailComponent,
  ],
  providers: [
    EmailService
  ]
})
export class DashboardModule { }
