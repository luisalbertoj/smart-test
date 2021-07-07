import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LessonsRoutingModule } from './lessons-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TagInputModule } from 'ngx-chips';

import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { HomeComponent } from './home/home.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { ProgressComponent } from './progress/progress.component';




@NgModule({
  declarations: [NewLessonComponent, HomeComponent, LessonDetailComponent, LessonViewComponent, ProgressComponent],
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
