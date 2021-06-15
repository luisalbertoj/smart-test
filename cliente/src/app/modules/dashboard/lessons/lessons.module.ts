import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LessonsRoutingModule } from './lessons-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';

import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [NewLessonComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LessonsRoutingModule,
    AngularEditorModule,
    TagInputModule
  ]
})
export class LessonsModule { }
